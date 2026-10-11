import { type } from 'arktype';

export const PROJECT_SCHEMA = type({
  name: 'string',
  description: 'string',
  url: 'string.url',
}).onUndeclaredKey('reject').readonly();
export const PROJECTS_SCHEMA = type(PROJECT_SCHEMA, '[]').readonly();

export type Project = typeof PROJECT_SCHEMA.infer;
export type Projects = typeof PROJECTS_SCHEMA.infer;
