import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ButtonDirective, ButtonIcon, ButtonLabel} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {NavItem} from "./nav-item/nav-item";
import {Menu} from "../../../../services/menu";

@Component({
  selector: 'app-mobile-navigation',
  imports: [ButtonDirective, ButtonLabel, ButtonIcon, Dialog, NavItem],
  templateUrl: './mobile-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigation {
  readonly menu = signal(inject(Menu).getMenuFromRouterConfig()).asReadonly();
  readonly menuVisible = signal(false);

  toggleMenu() {
    this.menuVisible.update((value) => !value);
  }

  onNavigated() {
    this.menuVisible.set(false);
  }
}
