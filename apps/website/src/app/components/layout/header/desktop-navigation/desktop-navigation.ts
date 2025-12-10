import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Menu } from '../../../../services/menu';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-desktop-navigation',
  imports: [NavItem],
  template: `
    <nav>
      <ul
        class="
          flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800
          shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm
          dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10
        "
      >
        @for (item of menu(); track item) {
          <li>
            <app-nav-item [href]="item.href">{{ item.label }}</app-nav-item>
          </li>
        }
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopNavigation {
  protected readonly menu = signal(inject(Menu).getMenu()).asReadonly();
}
