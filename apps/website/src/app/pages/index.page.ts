import type { LoadResult, RouteMeta } from '@analogjs/router';
import type { Projects } from '../../models/project';
import type { SocialLinks } from '../../models/social-link';
import type { load } from './index.server';

import { getLoadResolver } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { Container } from '../components/container/container';
import { FeaturedProjects } from '../components/featured-projects';
import { SocialLink } from '../components/social-link';

export const TITLE = 'Fullstack developer (Angular, ASP.NET Web API)';
export const DESCRIPTION = `I'm Fabien Dehopré, a fullstack developer using Angular and ASP.NET Core Web API. I am a consultant at Satellit srl as a Senior Fullstack Developer and expert Angular Developer.`;

// eslint-disable-next-line @typescript-eslint/naming-convention -- required by AnalogJS
export const routeMeta: RouteMeta = {
  title: `Fabien Dehopré - ${TITLE}`,
  meta: [
    { name: 'description', content: DESCRIPTION },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: `Fabien Dehopré - ${TITLE}` },
    { name: 'og:description', content: DESCRIPTION },
    { name: 'og:image', content: `https://dehopre.dev/api/v1/og-images?title=${encodeURIComponent(`Fabien Dehopré - ${TITLE}`)}` },
    { name: 'og:url', content: 'https://dehopre.dev' },
  ],
  resolve: {
    socialLinks: async (route) => {
      const data = await getLoadResolver<LoadResult<typeof load>>(route);
      return data.socialLinks;
    },
    projects: async (route) => {
      const data = await getLoadResolver<LoadResult<typeof load>>(route);
      return data.projects;
    },
  },
};

@Component({
  selector: 'app-home',
  imports: [Container, FeaturedProjects, SocialLink],
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
          @for (socialLink of socialLinks(); track socialLink.url) {
            <app-social-link [icon]="socialLink.icon" [label]="socialLink.label" [url]="socialLink.url" />
          }
        </div>
      </div>
    </app-container>
    <app-container cssClass="mt-24 md:mt-28">
      <div class="
        mx-auto grid max-w-xl grid-cols-1 gap-y-20
        lg:max-w-none lg:grid-cols-2
      ">
        <app-featured-projects [projects]="projects()" />
        <!-- Right column: reserved for the upcoming Work section (Roles). -->
        <div class="
          lg:pl-16
          xl:pl-24
        "></div>
      </div>
    </app-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  protected readonly title = signal(TITLE).asReadonly();
  protected readonly description = signal(DESCRIPTION).asReadonly();
  protected readonly socialLinks = input.required<SocialLinks>();
  protected readonly projects = input.required<Projects>();
  // protected readonly socialLinks = httpResource<SocialLinks>(
  //   () => '/api/v1/social-links',
  //   {
  //     parse: (data) => {
  //       const result = socialLinksValidator(data);
  //       if (result instanceof type.errors) {
  //         throw new TypeError(`Invalid social links data: ${result.summary}`, { cause: result });
  //       }
  //
  //       return result;
  //     },
  //   }
  // ).asReadonly();
}
