import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from './components/layout/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout],
  template: `
    <div class="flex w-full">
      <app-layout>
        <router-outlet />
      </app-layout>
    </div>
  `,
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
