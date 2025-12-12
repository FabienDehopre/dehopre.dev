import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Container } from '../components/container/container';

@Component({
  selector: 'app-about',
  imports: [Container, RouterOutlet],
  template: `
    <app-container cssClass="mt-16 sm:mt-32">
      <router-outlet />
    </app-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DefaultLayout {}
