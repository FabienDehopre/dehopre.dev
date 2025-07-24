import {ChangeDetectionStrategy, Component, computed, input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, UrlTree} from "@angular/router";

@Component({
  selector: 'app-nav-item',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './nav-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItem {
  readonly href = input.required<readonly any[] | string | UrlTree | null | undefined>();
  readonly isActive = signal(false);
  readonly isInactive = computed(() => !this.isActive());
}
