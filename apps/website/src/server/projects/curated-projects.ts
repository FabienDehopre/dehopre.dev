export interface CuratedProject {
  /** The GitHub repository, as `owner/name`. Any public repository works, not only Fabien's. */
  readonly repository: `${string}/${string}`;
  /** Replaces the GitHub description on the site when set. */
  readonly description?: string;
}

/** The Projects shown on the site, in display order. */
export const CURATED_PROJECTS: readonly CuratedProject[] = [
  { repository: 'FabienDehopre/triple-yahtzee-score-board' },
  { repository: 'FabienDehopre/my-netatmo-24' },
  { repository: 'FabienDehopre/FordConnectToAbrpSync' },
  { repository: 'FabienDehopre/eslint-config' },
  { repository: 'FabienDehopre/dehopre.dev' },
  { repository: 'FabienDehopre/game-of-life' },
];
