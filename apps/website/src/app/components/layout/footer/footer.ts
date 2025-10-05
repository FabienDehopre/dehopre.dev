import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { interval, map } from 'rxjs';

import { Menu } from '../../../services/menu';
import { ContainerInner } from '../../container/container-inner';
import { ContainerOuter } from '../../container/container-outer';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ContainerOuter, ContainerInner],
  templateUrl: './footer.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly menu = signal(inject(Menu).getMenuFromRouterConfig()).asReadonly();
  readonly year = toSignal(interval(1000).pipe(map(() => new Date().getFullYear())), { initialValue: new Date().getFullYear() });
}
