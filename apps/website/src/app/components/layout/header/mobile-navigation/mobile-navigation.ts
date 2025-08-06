import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

import { Menu } from '../../../../services/menu';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-mobile-navigation',
  imports: [ButtonDirective, ButtonLabel, ButtonIcon, Dialog, NavItem],
  templateUrl: './mobile-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigation {
  readonly menu = signal(inject(Menu).getMenuFromRouterConfig()).asReadonly();
  readonly menuVisible = signal(false);

  protected toggleMenu(): void {
    this.menuVisible.update((value) => !value);
  }

  protected onNavigated(): void {
    this.menuVisible.set(false);
  }
}
