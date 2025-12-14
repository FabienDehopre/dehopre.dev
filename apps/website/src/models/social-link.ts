import { type } from 'arktype';

export const SOCIAL_LINK_SCHEMA = type({
  label: 'string',
  url: 'string.url',
  icon: 'string',
}).onUndeclaredKey('reject').readonly();
export const SOCIAL_LINKS_SCHEMA = type(SOCIAL_LINK_SCHEMA, '[]').readonly();

export type SocialLink = typeof SOCIAL_LINK_SCHEMA.infer;
export type SocialLinks = typeof SOCIAL_LINKS_SCHEMA.infer;
