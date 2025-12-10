import type { RouteMeta } from '@analogjs/router';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Container } from '../components/container/container';

const TITLE = 'About';
const DESCRIPTION = `I'm Fabien Dehopré. I live in Brussels (Bruxelles).`;

// eslint-disable-next-line @typescript-eslint/naming-convention -- required by AnalogJS
export const routeMeta: RouteMeta = {
  title: `${TITLE} Fabien Dehopré`,
  meta: [
    { name: 'description', content: DESCRIPTION },
  ],
};

@Component({
  selector: 'app-about',
  imports: [Container],
  template: `
    <app-container cssClass="mt-16 sm:mt-32">
      <h1 class="
        text-4xl font-bold tracking-tight text-zinc-800
        sm:text-5xl
        dark:text-zinc-100
      ">{{ description() }}</h1>
    </app-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class About {
  protected readonly description = signal(DESCRIPTION).asReadonly();
}
