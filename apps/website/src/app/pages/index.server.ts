import type { PageServerLoad } from '@analogjs/router';

import { PROJECTS_SCHEMA } from '../../models/project';
import { SOCIAL_LINKS_SCHEMA } from '../../models/social-link';
import { fetchAndValidate } from '../../server/fetch-and-validate';

export async function load({ fetch }: PageServerLoad) {
  const [socialLinks, projects] = await Promise.all([
    fetchAndValidate(fetch, '/api/v1/social-links', SOCIAL_LINKS_SCHEMA, 'social links'),
    fetchAndValidate(fetch, '/api/v1/projects', PROJECTS_SCHEMA, 'projects'),
  ]);
  return { socialLinks, projects };
}
