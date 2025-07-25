import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Popover} from "primeng/popover";
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from "primeng/button";
import {Dialog} from "primeng/dialog";
import {NavItem} from "./nav-item/nav-item";

@Component({
  selector: 'app-mobile-navigation',
  imports: [ButtonDirective, ButtonLabel, ButtonIcon, Dialog, NavItem],
  templateUrl: './mobile-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigation {
  readonly menuVisible = signal(false);

  toggleMenu() {
    this.menuVisible.update((value) => !value);
  }

  onNavigated() {
    this.menuVisible.set(false);
  }
}
