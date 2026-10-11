import type { Project } from '../../models/project';

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  template: `
    <article class="group relative flex flex-col items-start" data-testid="projectCard">
      <div class="
        absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0
        transition
        group-hover:scale-100 group-hover:opacity-100
        sm:-inset-x-6 sm:rounded-2xl
        dark:bg-zinc-800/50
      "></div>
      <h2 class="
        text-base font-semibold text-zinc-800
        dark:text-zinc-100
      ">
        <a [href]="project().url">
          <span class="
            absolute -inset-x-4 -inset-y-6 z-20
            sm:-inset-x-6 sm:rounded-2xl
          "></span>
          <span class="relative z-10">{{ project().name }}</span>
        </a>
      </h2>
      <p class="
        relative z-10 mt-2 text-sm text-zinc-600
        dark:text-zinc-400
      ">{{ project().description }}</p>
    </article>
  `,
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
