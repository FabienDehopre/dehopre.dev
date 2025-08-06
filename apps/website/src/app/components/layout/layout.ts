import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Theme } from '../../services/theme';
import { Footer } from './footer/footer';
import { Header } from './header/header';

@Component({
  selector: 'app-layout',
  imports: [Footer, Header],
  templateUrl: './layout.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  readonly #theme = inject(Theme);
  readonly currentTheme = this.#theme.getCurrentTheme();

  constructor() {
    this.#theme.initTheme();
  }

  protected onSetTheme(theme: 'dark' | 'light'): void {
    this.#theme.setTheme(theme);
  }
}
