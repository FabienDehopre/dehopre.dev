import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {NavItem} from "./nav-item/nav-item";
import {Menu} from "../../../../services/menu";

@Component({
  selector: 'app-desktop-navigation',
  templateUrl: './desktop-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavItem]
})
export class DesktopNavigation {
  readonly menu = signal(inject(Menu).getMenuFromRouterConfig()).asReadonly();
}
