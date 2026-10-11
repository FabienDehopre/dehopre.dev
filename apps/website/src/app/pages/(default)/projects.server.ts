import type { PageServerLoad } from '@analogjs/router';
import type { Projects } from '../../../models/project';

import { type } from 'arktype';

import { PROJECTS_SCHEMA as projectsValidator } from '../../../models/project';

export async function load({ fetch }: PageServerLoad) {
  const projects = await fetch<Projects>('/api/v1/projects');
  const validationResult = projectsValidator(projects);
  if (validationResult instanceof type.errors) {
    throw new TypeError(`Invalid projects data: ${validationResult.summary}`, { cause: validationResult });
  }

  return {
    projects: validationResult,
  };
}
