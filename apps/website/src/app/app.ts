import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from './components/layout/layout';
import { Seo } from './services/seo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout],
  templateUrl: './app.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly #seo = inject(Seo);

  constructor() {
    this.#seo.init();
  }
}
