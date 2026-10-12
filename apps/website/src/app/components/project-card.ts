import type { Project } from '../../models/project';

import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFolderGit2, lucideGithub } from '@ng-icons/lucide';

/**
 * A Project as a card: the whole card links to the Project's primary link (its homepage, else its repository),
 * with a separate GitHub link when the Project has a homepage. Shared by the Projects page and the Home page.
 */
@Component({
  selector: 'app-project-card',
  imports: [NgIcon, NgOptimizedImage, NgTemplateOutlet],
  template: `
    <article class="group relative flex w-full flex-col items-start" data-testid="projectCard">
      <div class="
        absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0
        transition
        group-hover:scale-100 group-hover:opacity-100
        sm:-inset-x-6 sm:rounded-2xl
        dark:bg-zinc-800/50
      "></div>
      <div class="relative z-10 flex w-full items-center justify-between">
        <div class="
          flex size-12 items-center justify-center rounded-full bg-white
          shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5
          dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0
        ">
          @if (project().logo; as logo) {
            <img alt="" class="size-8" data-testid="projectLogo" height="32" width="32" [ngSrc]="logo" />
          } @else {
            <ng-icon aria-hidden="true" class="
              text-[length:--spacing(6)]
              text-zinc-500
              dark:text-zinc-400
            " data-testid="projectLogoFallback" name="lucideFolderGit2" />
          }
        </div>
        @if (project().archived) {
          <span class="
            rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium
            text-amber-700 ring-1 ring-amber-600/20
            dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/20
          ">Archived</span>
        }
      </div>
      <ng-template #title>
        <a [href]="link()">
          <span class="
            absolute -inset-x-4 -inset-y-6 z-20
            sm:-inset-x-6 sm:rounded-2xl
          "></span>
          <span class="relative z-10">{{ project().name }}</span>
        </a>
      </ng-template>
      @if (headingLevel() === 3) {
        <h3 class="
          mt-6 text-base font-semibold text-zinc-800
          dark:text-zinc-100
        "><ng-container [ngTemplateOutlet]="title" /></h3>
      } @else {
        <h2 class="
          mt-6 text-base font-semibold text-zinc-800
          dark:text-zinc-100
        "><ng-container [ngTemplateOutlet]="title" /></h2>
      }
      @if (project().description) {
        <p class="
          relative z-10 mt-2 text-sm text-zinc-600
          dark:text-zinc-400
        " data-testid="projectDescription">{{ project().description }}</p>
      }
      @if (project().languages.length > 0) {
        <ul aria-label="Languages" class="
          relative z-10 mt-4 flex flex-wrap gap-2
        " role="list">
          @for (language of project().languages; track language) {
            <li class="
              rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium
              text-zinc-600
              dark:bg-zinc-800 dark:text-zinc-400
            ">{{ language }}</li>
          }
        </ul>
      }
      @if (project().homepage) {
        <a class="
          relative z-30 mt-6 flex items-center gap-2 text-sm font-medium
          text-zinc-500 transition
          hover:text-teal-500
          dark:text-zinc-200 dark:hover:text-teal-400
        " [href]="project().repositoryUrl">
          <ng-icon aria-hidden="true" class="text-[length:--spacing(5)]" name="lucideGithub" />
          <span><span class="sr-only">{{ project().name }} on</span> GitHub</span>
        </a>
      }
    </article>
  `,
  styles: `:host { display: contents; }`,
  providers: [provideIcons({ lucideFolderGit2, lucideGithub })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  /** Where the card leads: the homepage when the Project has one, else the repository. */
  protected readonly link = computed(() => this.project().homepage ?? this.project().repositoryUrl);
  /** The heading level of the card title: 2 under a page's h1, 3 under a section's h2. */
  readonly headingLevel = input<2 | 3>(2);
  readonly project = input.required<Project>();
}
