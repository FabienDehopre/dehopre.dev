import {ChangeDetectionStrategy, Component, computed, input, signal} from '@angular/core';
import {RouterLink, RouterLinkActive, UrlTree} from "@angular/router";

@Component({
  selector: 'app-nav-item',
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './nav-item.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItem {
  readonly href = input.required<readonly unknown[] | string | UrlTree | null | undefined>();
  readonly isActive = signal(false);
  readonly isInactive = computed(() => !this.isActive());
}
