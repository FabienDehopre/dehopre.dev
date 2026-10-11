import type { PageServerLoad } from '@analogjs/router';
import type { Projects } from '../../models/project';
import type { SocialLinks } from '../../models/social-link';

import { type } from 'arktype';

import { PROJECTS_SCHEMA as projectsValidator } from '../../models/project';
import { SOCIAL_LINKS_SCHEMA as socialLinksValidator } from '../../models/social-link';

export async function load({ fetch }: PageServerLoad) {
  const [socialLinks, projects] = await Promise.all([
    fetch<SocialLinks>('/api/v1/social-links'),
    fetch<Projects>('/api/v1/projects'),
  ]);
  const socialLinksResult = socialLinksValidator(socialLinks);
  if (socialLinksResult instanceof type.errors) {
    throw new TypeError(`Invalid social links data: ${socialLinksResult.summary}`, { cause: socialLinksResult });
  }

  const projectsResult = projectsValidator(projects);
  if (projectsResult instanceof type.errors) {
    throw new TypeError(`Invalid projects data: ${projectsResult.summary}`, { cause: projectsResult });
  }

  return {
    socialLinks: socialLinksResult,
    projects: projectsResult,
  };
}
