import type { PageServerLoad } from '@analogjs/router';

import { PROJECTS_SCHEMA } from '../../../models/project';
import { fetchAndValidate } from '../../../server/fetch-and-validate';

export async function load({ fetch }: PageServerLoad) {
  return {
    projects: await fetchAndValidate(fetch, '/api/v1/projects', PROJECTS_SCHEMA, 'projects'),
  };
}
