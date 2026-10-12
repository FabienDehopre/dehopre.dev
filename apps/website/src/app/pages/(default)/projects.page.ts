import type { LoadResult, RouteMeta } from '@analogjs/router';
import type { Projects } from '../../../models/project';
import type { load } from './projects.server';

import { getLoadResolver } from '@analogjs/router';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { ProjectCard } from '../../components/project-card';

const PAGE_TITLE = 'Projects - Fabien Dehopré';
const HEADLINE = 'Things I\'ve made: apps, tools and experiments.';
const DESCRIPTION = 'A hand-picked selection of the things I\'ve built and published on GitHub. They are all open source, so feel free to dig into the code.';

// eslint-disable-next-line @typescript-eslint/naming-convention -- required by AnalogJS
export const routeMeta: RouteMeta = {
  title: PAGE_TITLE,
  meta: [
    { name: 'description', content: DESCRIPTION },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: PAGE_TITLE },
    { name: 'og:description', content: DESCRIPTION },
    { name: 'og:image', content: `https://dehopre.dev/api/v1/og-images?title=${encodeURIComponent(PAGE_TITLE)}` },
    { name: 'og:url', content: 'https://dehopre.dev/projects' },
  ],
  resolve: {
    projects: async (route) => {
      const data = await getLoadResolver<LoadResult<typeof load>>(route);
      return data.projects;
    },
  },
};

@Component({
  selector: 'app-projects',
  imports: [ProjectCard],
  template: `
    <header class="max-w-2xl">
      <h1 class="
        text-4xl font-bold tracking-tight text-zinc-800
        sm:text-5xl
        dark:text-zinc-100
      " data-testid="pageTitle">{{ headline() }}</h1>
      <p class="
        mt-6 text-base text-zinc-600
        dark:text-zinc-400
      " data-testid="pageDescription">{{ description() }}</p>
    </header>
    <ul class="
      mt-16 grid grid-cols-1 gap-x-12 gap-y-16
      sm:mt-20 sm:grid-cols-2
      lg:grid-cols-3
    " role="list">
      @for (project of projects(); track project.repositoryUrl) {
        <li class="flex">
          <app-project-card [project]="project" />
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsPage {
  protected readonly headline = signal(HEADLINE).asReadonly();
  protected readonly description = signal(DESCRIPTION).asReadonly();
  protected readonly projects = input.required<Projects>();
}
