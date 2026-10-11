import type { Project } from '../models/project';

/**
 * Already-loaded Project data for component tests: a Project without a homepage, logo, archived state or featured flag,
 * with the given fields replaced.
 * @param overrides the fields that matter to the test
 */
export function aProject(overrides: Partial<Project> = {}): Project {
  const name = overrides.name ?? 'game-of-life';
  const repositoryUrl = overrides.repositoryUrl ?? `https://github.com/FabienDehopre/${name}`;
  return {
    name,
    description: `${name} description`,
    languages: ['TypeScript'],
    repositoryUrl,
    archived: false,
    featured: false,
    ...overrides,
  };
}
