import type { RouteMeta } from '@analogjs/router';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

const DESCRIPTION = `I'm Fabien Dehopré. I live in Brussels (Bruxelles).`;

// eslint-disable-next-line @typescript-eslint/naming-convention -- required by AnalogJS
export const routeMeta: RouteMeta = {
  title: `About Fabien Dehopré`,
  meta: [
    { name: 'description', content: DESCRIPTION },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: `About Fabien Dehopré` },
    { name: 'og:description', content: DESCRIPTION },
    { name: 'og:image', content: `https://dehopre.dev/api/v1/og-images?title=${encodeURIComponent('About Fabien Dehopré')}` },
    { name: 'og:url', content: 'https://dehopre.dev/about' },
  ],
};

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <h1 class="
      text-4xl font-bold tracking-tight text-zinc-800
      sm:text-5xl
      dark:text-zinc-100
    ">{{ description() }}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class About {
  protected readonly description = signal(DESCRIPTION).asReadonly();
}
