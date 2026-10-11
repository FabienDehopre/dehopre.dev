import type { Project } from '../../models/project';
import type { CuratedProject } from './curated-projects';

import { env } from 'node:process';

const GITHUB_API_URL = 'https://api.github.com';
const MAX_LANGUAGES = 3;
const MIN_LANGUAGE_SHARE = 0.1;

interface GitHubRepository {
  name: string;
  description: string | null;
  homepage: string | null;
  archived: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention -- GitHub API field
  html_url: string;
}

/** GitHub's language breakdown: bytes of code per language. */
type GitHubLanguages = Record<string, number>;

/**
 * Turns the curated Project list into Project data by fetching each repository and its languages from the GitHub REST API.
 * Sends `GITHUB_TOKEN` from the environment as a bearer token when it is set.
 * Any failure throws an error naming the repository; no Project is skipped (see ADR 0001).
 * @param curatedProjects the curated Project list, in display order
 */
export async function loadProjects(curatedProjects: readonly CuratedProject[]): Promise<Project[]> {
  const headers = gitHubHeaders(env['GITHUB_TOKEN']);
  return Promise.all(curatedProjects.map(async (curated) => {
    const [repository, languages] = await Promise.all([
      fetchFromGitHub<GitHubRepository>(curated.repository, '', headers),
      fetchFromGitHub<GitHubLanguages>(curated.repository, '/languages', headers),
    ]);
    return {
      name: repository.name,
      description: curated.description ?? repository.description ?? '',
      languages: mainLanguages(languages),
      link: primaryLink(repository),
      repositoryUrl: repository.html_url,
      archived: repository.archived,
      ...(curated.logo === undefined ? {} : { logo: curated.logo }),
      featured: curated.featured ?? false,
    };
  }));
}

/**
 * The homepage when the repository has one (GitHub sends `null` or `''` when it has none), else the repository.
 * @param repository the repository metadata
 */
function primaryLink(repository: GitHubRepository): string {
  if (repository.homepage) {
    return repository.homepage;
  }

  return repository.html_url;
}

/**
 * The languages that make up at least 10% of the code, largest share first, at most three.
 * @param languages GitHub's language breakdown
 */
function mainLanguages(languages: GitHubLanguages): string[] {
  const entries = Object.entries(languages);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  return entries
    .filter(([, bytes]) => bytes / total >= MIN_LANGUAGE_SHARE)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_LANGUAGES)
    .map(([language]) => language);
}

/**
 * @param token the optional GitHub token
 */
function gitHubHeaders(token: string | undefined): Headers {
  const headers = new Headers({
    accept: 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28',
  });
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  return headers;
}

/**
 * @param repository the repository, as `owner/name`
 * @param resource the path under the repository (`''` for the repository itself, `/languages`, …)
 * @param headers the request headers
 */
async function fetchFromGitHub<T>(repository: string, resource: string, headers: Headers): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${GITHUB_API_URL}/repos/${repository}${resource}`, { headers });
  } catch (error) {
    throw new Error(`Failed to load Project ${repository} from GitHub: ${String(error)}`, { cause: error });
  }

  if (!response.ok) {
    throw new Error(`Failed to load Project ${repository} from GitHub: ${response.status} ${response.statusText}`.trimEnd());
  }

  return await response.json() as T;
}
