import type { Projects } from '../../models/project';

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';

import { ProjectCard } from './project-card';

/** The Home page layout has room for this many Featured Projects, however many are flagged. */
const MAX_FEATURED_PROJECTS = 3;

/**
 * The Featured Projects section of the Home page: the first three Projects flagged in the curated list, as Project cards.
 */
@Component({
  selector: 'app-featured-projects',
  imports: [NgIcon, ProjectCard, RouterLink],
  template: `
    <section aria-labelledby="featured-projects-title" class="
      flex flex-col gap-16
    ">
      <h2 class="
        text-sm font-semibold text-zinc-900
        dark:text-zinc-100
      " id="featured-projects-title">Featured Projects</h2>
      <ul class="flex flex-col gap-16" role="list">
        @for (project of featuredProjects(); track project.repositoryUrl) {
          <li class="flex">
            <app-project-card [headingLevel]="3" [project]="project" />
          </li>
        }
      </ul>
      <a class="
        flex items-center gap-2 text-sm font-medium text-teal-500 transition
        hover:text-teal-600
        dark:text-teal-400 dark:hover:text-teal-300
      " routerLink="/projects">
        See all projects
        <ng-icon aria-hidden="true" class="text-[length:--spacing(4)]" name="lucideArrowRight" />
      </a>
    </section>
  `,
  providers: [provideIcons({ lucideArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProjects {
  protected readonly featuredProjects = computed(() => this.projects().filter((project) => project.featured).slice(0, MAX_FEATURED_PROJECTS));
  /** All the Projects, in curated list order. */
  readonly projects = input.required<Projects>();
}
