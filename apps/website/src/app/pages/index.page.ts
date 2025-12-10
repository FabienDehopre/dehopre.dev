import type { RouteMeta } from '@analogjs/router';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Container } from '../components/container/container';

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
  imports: [Container],
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
      </div>
    </app-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  protected readonly title = signal(TITLE).asReadonly();
  protected readonly description = signal(DESCRIPTION).asReadonly();
}
