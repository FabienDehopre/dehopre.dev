import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Theme } from '../../services/theme';
import { Footer } from './footer/footer';
import { Header } from './header/header';

@Component({
  selector: 'app-layout',
  imports: [Footer, Header],
  template: `
    <div class="
      fixed inset-0 flex justify-center
      sm:px-8
    ">
      <div class="
        flex w-full max-w-7xl
        lg:px-8
      ">
        <div class="
          w-full bg-white ring-1 ring-zinc-100
          dark:bg-zinc-900 dark:ring-zinc-300/20
        "></div>
      </div>
    </div>
    <div class="relative flex w-full flex-col">
      <app-header [theme]="currentTheme()" (setTheme)="onSetTheme($event)" />
      <main class="flex-auto">
        <ng-content />
      </main>
      <app-footer />
    </div>
  `,
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  private readonly theme = inject(Theme);
  protected readonly currentTheme = this.theme.getCurrentTheme();

  constructor() {
    afterNextRender({
      write: () => this.theme.initTheme(),
    });
  }

  protected onSetTheme(theme: 'dark' | 'light'): void {
    this.theme.setTheme(theme);
  }
}
