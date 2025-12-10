import type { UrlTree } from '@angular/router';

import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [
    RouterLink,
  ],
  template: `
    <a class="block py-2" [routerLink]="href()" (click)="navigated.emit()">
      <ng-content />
    </a>
  `,
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItem {
  readonly href = input.required<UrlTree | string | readonly unknown[] | null | undefined>();
  readonly navigated = output();
}
