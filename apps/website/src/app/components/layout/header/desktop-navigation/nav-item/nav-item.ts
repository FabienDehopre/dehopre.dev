import type { UrlTree } from '@angular/router';

import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './nav-item.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItem {
  readonly href = input.required<UrlTree | string | readonly unknown[] | null | undefined>();
  readonly isActive = signal(false);
  readonly isInactive = computed(() => !this.isActive());
}
