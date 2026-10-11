import { loadProjects } from './load-projects';

interface FakeResponse {
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
  delayMs?: number;
}

/**
 * Replaces GitHub at the HTTP boundary: answers each request from the fixture registered for its URL,
 * and records the requests so tests can inspect what was sent. Unregistered URLs get a 404.
 * @param fixtures responses keyed by the path after `/repos/` (`owner/name`, `owner/name/languages`)
 */
function fakeGitHub(fixtures: Record<string, FakeResponse>) {
  const requests: Request[] = [];
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    requests.push(request);
    const path = new URL(request.url).pathname.replace(/^\/repos\//, '');
    const fixture = fixtures[path] ?? { status: 404, body: { message: 'Not Found' } };
    if (fixture.delayMs !== undefined) {
      await new Promise((resolve) => setTimeout(resolve, fixture.delayMs));
    }

    return new Response(JSON.stringify(fixture.body ?? {}), {
      status: fixture.status,
      headers: { 'content-type': 'application/json', ...fixture.headers },
    });
  });
  vi.stubGlobal('fetch', fetchMock);
  return { requests };
}

interface RepoFixture {
  description?: string | null;
  homepage?: string | null;
  archived?: boolean;
  /** GitHub's language breakdown, as [language, bytes of code] pairs. */
  languages?: [language: string, bytes: number][];
  delayMs?: number;
}

/**
 * Successful GitHub responses for one repository: "get a repository" and "list repository languages".
 * @param fullName `owner/name`
 * @param fixture the repository data GitHub returns
 */
function repo(fullName: string, fixture: RepoFixture = {}): Record<string, FakeResponse> {
  const [, name] = fullName.split('/');
  const { description = `${fullName} on GitHub`, homepage = null, archived = false, languages = [], delayMs } = fixture;
  return {
    [fullName]: {
      status: 200,
      // eslint-disable-next-line @typescript-eslint/naming-convention -- GitHub API fields
      body: { name, full_name: fullName, description, homepage, archived, html_url: `https://github.com/${fullName}` },
      delayMs,
    },
    [`${fullName}/languages`]: { status: 200, body: Object.fromEntries(languages) },
  };
}

describe(loadProjects.name, () => {
  beforeEach(() => {
    vi.stubEnv('GITHUB_TOKEN', undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  test('returns the Project with its GitHub name, description and repository link', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life', { description: 'Conway\'s Game of Life', languages: [['TypeScript', 9000]] }));

    const projects = await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(projects).toEqual([
      {
        name: 'game-of-life',
        description: 'Conway\'s Game of Life',
        languages: ['TypeScript'],
        link: 'https://github.com/FabienDehopre/game-of-life',
        repositoryUrl: 'https://github.com/FabienDehopre/game-of-life',
        archived: false,
      },
    ]);
  });

  test('uses the description override instead of the GitHub description when set', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life', { description: 'Conway\'s Game of Life' }));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/game-of-life', description: 'A cellular automaton in Angular.' }]);

    expect(project.description).toBe('A cellular automaton in Angular.');
  });

  test('lists the languages that make up at least 10% of the code, largest share first', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life', { languages: [['HTML', 2000], ['TypeScript', 7000], ['Shell', 999]] }));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(project.languages).toEqual(['TypeScript', 'HTML']);
  });

  test('lists at most three languages', async () => {
    fakeGitHub(repo('FabienDehopre/dehopre.dev', { languages: [['CSS', 1600], ['HTML', 2000], ['JavaScript', 1400], ['TypeScript', 5000]] }));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/dehopre.dev' }]);

    expect(project.languages).toEqual(['TypeScript', 'HTML', 'CSS']);
  });

  test('lists no languages when GitHub detects no code', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life', { languages: [] }));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(project.languages).toEqual([]);
  });

  test('links to the homepage when the repository has one, and still exposes the repository URL', async () => {
    fakeGitHub(repo('FabienDehopre/my-netatmo-24', { homepage: 'https://netatmo.dehopre.dev' }));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/my-netatmo-24' }]);

    expect(project.link).toBe('https://netatmo.dehopre.dev');
    expect(project.repositoryUrl).toBe('https://github.com/FabienDehopre/my-netatmo-24');
  });

  test('links to the repository when the homepage is empty', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life', { homepage: '' }));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(project.link).toBe('https://github.com/FabienDehopre/game-of-life');
  });

  test('marks an archived repository as archived', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life', { archived: true }));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(project.archived).toBeTruthy();
  });

  test('includes the logo from the curated list when set', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life'));

    const [project] = await loadProjects([{ repository: 'FabienDehopre/game-of-life', logo: '/images/projects/game-of-life.svg' }]);

    expect(project.logo).toBe('/images/projects/game-of-life.svg');
  });

  test('returns the Projects in curated list order, whatever order GitHub answers in', async () => {
    fakeGitHub({
      ...repo('FabienDehopre/triple-yahtzee-score-board', { delayMs: 20 }),
      ...repo('FabienDehopre/my-netatmo-24', { delayMs: 10 }),
      ...repo('FabienDehopre/game-of-life'),
    });

    const projects = await loadProjects([
      { repository: 'FabienDehopre/triple-yahtzee-score-board' },
      { repository: 'FabienDehopre/my-netatmo-24' },
      { repository: 'FabienDehopre/game-of-life' },
    ]);

    expect(projects.map((project) => project.name)).toEqual(['triple-yahtzee-score-board', 'my-netatmo-24', 'game-of-life']);
  });

  test('throws an error naming the repository when it does not exist', async () => {
    fakeGitHub(repo('FabienDehopre/game-of-life'));

    await expect(loadProjects([
      { repository: 'FabienDehopre/game-of-life' },
      { repository: 'FabienDehopre/deleted-repo' },
    ])).rejects.toThrow('FabienDehopre/deleted-repo');
  });

  test('throws an error naming the repository when GitHub answers with a server error', async () => {
    fakeGitHub({ 'FabienDehopre/game-of-life': { status: 503, body: { message: 'Service Unavailable' } } });

    await expect(loadProjects([{ repository: 'FabienDehopre/game-of-life' }])).rejects.toThrow('FabienDehopre/game-of-life');
  });

  test('throws an error naming the repository when its languages cannot be loaded', async () => {
    fakeGitHub({
      ...repo('FabienDehopre/game-of-life'),
      'FabienDehopre/game-of-life/languages': { status: 503, body: { message: 'Service Unavailable' } },
    });

    await expect(loadProjects([{ repository: 'FabienDehopre/game-of-life' }])).rejects.toThrow('FabienDehopre/game-of-life');
  });

  test('throws an error naming the repository when GitHub rate-limits the build', async () => {
    fakeGitHub({
      'FabienDehopre/game-of-life': {
        status: 403,
        body: { message: 'API rate limit exceeded' },
        headers: { 'x-ratelimit-remaining': '0' },
      },
    });

    await expect(loadProjects([{ repository: 'FabienDehopre/game-of-life' }])).rejects.toThrow('FabienDehopre/game-of-life');
  });

  test('throws an error naming the repository when GitHub cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')));

    await expect(loadProjects([{ repository: 'FabienDehopre/game-of-life' }])).rejects.toThrow('FabienDehopre/game-of-life');
  });

  test('sends GITHUB_TOKEN as a bearer token on every request when it is set', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    const { requests } = fakeGitHub(repo('FabienDehopre/game-of-life'));

    await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(requests.map((request) => request.headers.get('authorization'))).toEqual(['Bearer test-token', 'Bearer test-token']);
  });

  test('sends no authorization header when GITHUB_TOKEN is not set', async () => {
    const { requests } = fakeGitHub(repo('FabienDehopre/game-of-life'));

    await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(requests.some((request) => request.headers.has('authorization'))).toBeFalsy();
  });
});
