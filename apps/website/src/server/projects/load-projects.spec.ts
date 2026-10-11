import { loadProjects } from './load-projects';

interface FakeResponse {
  status: number;
  body?: unknown;
  headers?: Record<string, string>;
  delayMs?: number;
}

/**
 * Replaces GitHub at the HTTP boundary: answers each request from the fixture registered for its URL,
 * and records the requests so tests can inspect what was sent.
 * @param fixtures responses keyed by `owner/name`
 */
function fakeGitHub(fixtures: Record<string, FakeResponse>) {
  const requests: Request[] = [];
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const request = new Request(input, init);
    requests.push(request);
    const repository = new URL(request.url).pathname.replace(/^\/repos\//, '');
    const fixture = fixtures[repository] ?? { status: 404, body: { message: 'Not Found' } };
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

/**
 * A successful GitHub "get a repository" response.
 * @param fullName `owner/name`
 * @param description the repository description on GitHub
 */
function repo(fullName: string, description: string | null = `${fullName} on GitHub`): FakeResponse {
  const [, name] = fullName.split('/');
  return {
    status: 200,
    // eslint-disable-next-line @typescript-eslint/naming-convention -- GitHub API fields
    body: { name, full_name: fullName, description, html_url: `https://github.com/${fullName}` },
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
    fakeGitHub({ 'FabienDehopre/game-of-life': repo('FabienDehopre/game-of-life', 'Conway\'s Game of Life') });

    const projects = await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(projects).toEqual([
      { name: 'game-of-life', description: 'Conway\'s Game of Life', url: 'https://github.com/FabienDehopre/game-of-life' },
    ]);
  });

  test('uses the description override instead of the GitHub description when set', async () => {
    fakeGitHub({ 'FabienDehopre/game-of-life': repo('FabienDehopre/game-of-life', 'Conway\'s Game of Life') });

    const [project] = await loadProjects([{ repository: 'FabienDehopre/game-of-life', description: 'A cellular automaton in Angular.' }]);

    expect(project.description).toBe('A cellular automaton in Angular.');
  });

  test('returns the Projects in curated list order, whatever order GitHub answers in', async () => {
    fakeGitHub({
      'FabienDehopre/triple-yahtzee-score-board': { ...repo('FabienDehopre/triple-yahtzee-score-board'), delayMs: 20 },
      'FabienDehopre/my-netatmo-24': { ...repo('FabienDehopre/my-netatmo-24'), delayMs: 10 },
      'FabienDehopre/game-of-life': repo('FabienDehopre/game-of-life'),
    });

    const projects = await loadProjects([
      { repository: 'FabienDehopre/triple-yahtzee-score-board' },
      { repository: 'FabienDehopre/my-netatmo-24' },
      { repository: 'FabienDehopre/game-of-life' },
    ]);

    expect(projects.map((project) => project.name)).toEqual(['triple-yahtzee-score-board', 'my-netatmo-24', 'game-of-life']);
  });

  test('throws an error naming the repository when it does not exist', async () => {
    fakeGitHub({ 'FabienDehopre/game-of-life': repo('FabienDehopre/game-of-life') });

    await expect(loadProjects([
      { repository: 'FabienDehopre/game-of-life' },
      { repository: 'FabienDehopre/deleted-repo' },
    ])).rejects.toThrow('FabienDehopre/deleted-repo');
  });

  test('throws an error naming the repository when GitHub answers with a server error', async () => {
    fakeGitHub({ 'FabienDehopre/game-of-life': { status: 503, body: { message: 'Service Unavailable' } } });

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

  test('sends GITHUB_TOKEN as a bearer token when it is set', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    const { requests } = fakeGitHub({ 'FabienDehopre/game-of-life': repo('FabienDehopre/game-of-life') });

    await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(requests.map((request) => request.headers.get('authorization'))).toEqual(['Bearer test-token']);
  });

  test('sends no authorization header when GITHUB_TOKEN is not set', async () => {
    const { requests } = fakeGitHub({ 'FabienDehopre/game-of-life': repo('FabienDehopre/game-of-life') });

    await loadProjects([{ repository: 'FabienDehopre/game-of-life' }]);

    expect(requests.map((request) => request.headers.has('authorization'))).toEqual([false]);
  });
});
