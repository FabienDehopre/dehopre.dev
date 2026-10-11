import { type } from 'arktype';

export const PROJECT_SCHEMA = type({
  name: 'string',
  description: 'string',
  /** Up to three languages, each at least 10% of the code by bytes, largest share first. */
  languages: type('string[]').readonly(),
  /** Where the card leads: the homepage when the repository has one, else the repository. */
  link: 'string.url',
  repositoryUrl: 'string.url',
  archived: 'boolean',
  /** The logo set in the curated list, as an image path relative to the site root. */
  'logo?': 'string',
}).onUndeclaredKey('reject').readonly();
export const PROJECTS_SCHEMA = type(PROJECT_SCHEMA, '[]').readonly();

export type Project = typeof PROJECT_SCHEMA.infer;
export type Projects = typeof PROJECTS_SCHEMA.infer;
