import type { SocialLink, SocialLinks } from '../../../../models/social-link';

import { defineEventHandler } from 'h3';

import {
  BLUESKY_ICON,
  FACEBOOK_ICON,
  GITHUB_ICON,
  INSTAGRAM_ICON,
  LINKEDIN_ICON,
  MASTODON_ICON,
  REDDIT_ICON,
  X_TWITTER_ICON,
  YOUTUBE_ICON
} from '../../../../models/social-icon';

type SocialLinkData = SocialLink & { visible: boolean };
const SOCIAL_LINKS: SocialLinkData[] = [
  { label: 'Follow me on X', url: 'https://x.com/FabienDehopre', icon: X_TWITTER_ICON, visible: true },
  { label: 'Follow me on Bluesky', url: 'https://bsky.app/profile/dehopre.dev', icon: BLUESKY_ICON, visible: true },
  { label: 'Follow me on Mastodon', url: 'https://mastodon.social/@ghostlyshade', icon: MASTODON_ICON, visible: false },
  { label: 'Follow me on Reddit', url: 'https://www.reddit.com/user/NoEar9399/', icon: REDDIT_ICON, visible: false },
  { label: 'Follow me on Facebook', url: 'https://www.facebook.com/ghostlyshade', icon: FACEBOOK_ICON, visible: false },
  { label: 'Follow me on Instagram', url: 'https://www.instagram.com/gh0stlysh4d3/', icon: INSTAGRAM_ICON, visible: false },
  { label: 'Follow me on LinkedIn', url: 'https://www.linkedin.com/in/fabien1979/', icon: LINKEDIN_ICON, visible: true },
  { label: 'Follow me on GitHub', url: 'https://github.com/FabienDehopre', icon: GITHUB_ICON, visible: true },
  { label: 'Follow me on YouTube', url: 'https://www.youtube.com/@CasualFab', icon: YOUTUBE_ICON, visible: true },
];

export default defineEventHandler((): SocialLinks => {
  return SOCIAL_LINKS.filter((link) => link.visible).map(({ visible, ...link }) => link);
});
