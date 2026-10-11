import type { Project } from '../../models/project';
import type { CuratedProject } from './curated-projects';

import { env } from 'node:process';

const GITHUB_API_URL = 'https://api.github.com';

interface GitHubRepository {
  name: string;
  description: string | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention -- GitHub API field
  html_url: string;
}

/**
 * Turns the curated Project list into Project data by fetching each repository from the GitHub REST API.
 * Sends `GITHUB_TOKEN` from the environment as a bearer token when it is set.
 * Any failure throws an error naming the repository; no Project is skipped (see ADR 0001).
 * @param curatedProjects the curated Project list, in display order
 */
export async function loadProjects(curatedProjects: readonly CuratedProject[]): Promise<Project[]> {
  const headers = gitHubHeaders(env['GITHUB_TOKEN']);
  return Promise.all(curatedProjects.map(async (curated) => {
    const repository = await fetchRepository(curated.repository, headers);
    return {
      name: repository.name,
      description: curated.description ?? repository.description ?? '',
      url: repository.html_url,
    };
  }));
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
 * @param headers the request headers
 */
async function fetchRepository(repository: string, headers: Headers): Promise<GitHubRepository> {
  let response: Response;
  try {
    response = await fetch(`${GITHUB_API_URL}/repos/${repository}`, { headers });
  } catch (error) {
    throw new Error(`Failed to load Project ${repository} from GitHub: ${String(error)}`, { cause: error });
  }

  if (!response.ok) {
    throw new Error(`Failed to load Project ${repository} from GitHub: ${response.status} ${response.statusText}`.trimEnd());
  }

  return await response.json() as GitHubRepository;
}
