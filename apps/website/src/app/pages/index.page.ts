import type { RouteMeta } from '@analogjs/router';
import type {
  SocialIcon } from '../components/social-link';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Container } from '../components/container/container';
import {
  BLUESKY_ICON,
  FACEBOOK_ICON, GITHUB_ICON,
  INSTAGRAM_ICON, LINKEDIN_ICON,
  MASTODON_ICON,
  REDDIT_ICON, SocialLink, X_TWITTER_ICON, YOUTUBE_ICON
} from '../components/social-link';

export const TITLE = 'Fullstack developer (Angular, ASP.NET Web API)';
export const DESCRIPTION = `I'm Fabien Dehopré, a fullstack developer using Angular and ASP.NET Core Web API. I am a consultant at Satellit srl as a Senior Fullstack Developer and expert Angular Developer.`;

// eslint-disable-next-line @typescript-eslint/naming-convention -- required by AnalogJS
export const routeMeta: RouteMeta = {
  title: `Fabien Dehopré - ${TITLE}`,
  meta: [
    { name: 'description', content: DESCRIPTION },
  ],
};

@Component({
  selector: 'app-home',
  imports: [Container, SocialLink],
  template: `
    <app-container cssClass="mt-9">
      <div class="max-w-2xl">
        <h1 class="
          text-4xl font-bold tracking-tight text-zinc-800
          sm:text-5xl
          dark:text-zinc-100
        " data-testid="pageTitle">
          {{ title() }}
        </h1>
        <p class="
          mt-6 text-base text-zinc-600
          dark:text-zinc-400
        " data-testid="pageDescription">{{ description() }}</p>
        <div class="mt-6 flex gap-6">
          @for (socialLink of socialLinks; track socialLink.url) {
            <app-social-link [icon]="socialLink.icon" [label]="socialLink.label" [url]="socialLink.url" />
          }
        </div>
      </div>
    </app-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  protected readonly title = signal(TITLE).asReadonly();
  protected readonly description = signal(DESCRIPTION).asReadonly();
  protected readonly socialLinks: {
    label: string;
    url: string;
    icon: SocialIcon;
  }[] = [
    { label: 'Follow me on X', url: 'https://x.com/FabienDehopre', icon: X_TWITTER_ICON },
    { label: 'Follow me on Bluesky', url: 'https://bsky.app/profile/dehopre.dev', icon: BLUESKY_ICON },
    { label: 'Follow me on Mastodon', url: 'https://mastodon.social/@ghostlyshade', icon: MASTODON_ICON },
    { label: 'Follow me on Reddit', url: 'https://www.reddit.com/user/NoEar9399/', icon: REDDIT_ICON },
    { label: 'Follow me on Facebook', url: 'https://www.facebook.com/ghostlyshade', icon: FACEBOOK_ICON },
    { label: 'Follow me on Instagram', url: 'https://www.instagram.com/gh0stlysh4d3/', icon: INSTAGRAM_ICON },
    { label: 'Follow me on LinkedIn', url: 'https://www.linkedin.com/in/fabien1979/', icon: LINKEDIN_ICON },
    { label: 'Follow me on GitHub', url: 'https://github.com/FabienDehopre', icon: GITHUB_ICON },
    { label: 'Follow me on YouTube', url: 'https://www.youtube.com/@CasualFab', icon: YOUTUBE_ICON },
  ] as const;
}
