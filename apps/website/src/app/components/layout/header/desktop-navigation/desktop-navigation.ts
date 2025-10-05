import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Menu } from '../../../../services/menu';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-desktop-navigation',
  imports: [NavItem],
  templateUrl: './desktop-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopNavigation {
  readonly menu = signal(inject(Menu).getMenuFromRouterConfig()).asReadonly();
}
