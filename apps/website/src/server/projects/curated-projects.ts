export interface CuratedProject {
  /** The GitHub repository, as `owner/name`. Any public repository works, not only Fabien's. */
  readonly repository: `${string}/${string}`;
  /** Replaces the GitHub description on the site when set. */
  readonly description?: string;
  /** The Project's logo, as an image path relative to the site root (e.g. `/images/projects/name.svg`). A generic icon is shown when unset. */
  readonly logo?: string;
  /** Shows the Project on the Home page as a Featured Project. Only the first three flagged Projects are shown there. */
  readonly featured?: boolean;
}

/** The Projects shown on the site, in display order. */
export const CURATED_PROJECTS: readonly CuratedProject[] = [
  { repository: 'FabienDehopre/triple-yahtzee-score-board' },
  { repository: 'FabienDehopre/my-netatmo-24' },
  { repository: 'FabienDehopre/FordConnectToAbrpSync', featured: true },
  { repository: 'FabienDehopre/eslint-config' },
  { repository: 'FabienDehopre/dehopre.dev' },
  { repository: 'FabienDehopre/game-of-life' },
];
