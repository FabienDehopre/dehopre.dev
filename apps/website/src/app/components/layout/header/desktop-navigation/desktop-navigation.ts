import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NavItem} from "./nav-item/nav-item";

@Component({
  selector: 'app-desktop-navigation',
  templateUrl: './desktop-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavItem]
})
export class DesktopNavigation {}
