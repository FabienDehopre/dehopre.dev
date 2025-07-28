import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {RouterLink, UrlTree} from "@angular/router";

@Component({
  selector: 'app-nav-item',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-item.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItem {
  readonly href = input.required<readonly unknown[] | string | UrlTree | null | undefined>();
  readonly navigated = output();
}
