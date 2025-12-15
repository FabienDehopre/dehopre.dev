import type { PageServerLoad } from '@analogjs/router';
import type { SocialLinks } from '../../models/social-link';

import { type } from 'arktype';

import { SOCIAL_LINKS_SCHEMA as socialLinksValidator } from '../../models/social-link';

export async function load({ fetch }: PageServerLoad) {
  const socialLinks = await fetch<SocialLinks>('/api/v1/social-links');
  const validationResult = socialLinksValidator(socialLinks);
  if (validationResult instanceof type.errors) {
    throw new TypeError(`Invalid social links data: ${validationResult.summary}`, { cause: validationResult });
  }

  return {
    socialLinks: validationResult,
  };
}
