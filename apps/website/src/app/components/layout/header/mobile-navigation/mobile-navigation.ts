import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideX } from '@ng-icons/lucide';

import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

import { Menu } from '../../../../services/menu';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-mobile-navigation',
  imports: [HlmButtonImports, HlmDialogImports, NgIcon, NavItem],
  template: `
    <hlm-dialog>
      <button
        class="
          group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm
          font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5
          ring-zinc-900/5 backdrop-blur-sm
          dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10
          dark:hover:ring-white/20
        "
        hlmDialogTrigger
        type="button"
      >
        Menu
        <ng-icon
          class="
            ml-3
            text-[length:--spacing(3)]
            text-zinc-500
            group-hover:text-zinc-700
            dark:group-hover:text-zinc-400
          "
          name="lucideChevronDown"
        />
      </button>
      <hlm-dialog-content
        *hlmDialogPortal="let ctx"
        class="
          fixed inset-x-4 top-8 w-auto max-w-none origin-top gap-0 rounded-3xl
          bg-white p-8 ring-zinc-900/5
          sm:max-w-none
          dark:bg-zinc-900 dark:ring-zinc-800
        "
        [showCloseButton]="false"
      >
        <hlm-dialog-header class="
          flex-row-reverse items-center justify-between
        ">
          <button
            aria-label="Close menu"
            class="
              -m-1 text-zinc-500
              dark:text-zinc-400
            "
            hlmBtn
            hlmDialogClose
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            <ng-icon class="text-[length:--spacing(6)]" name="lucideX" />
          </button>
          <h2
            class="
              text-sm font-medium text-zinc-600
              dark:text-zinc-400
            "
            hlmDialogTitle
          >Navigation</h2>
        </hlm-dialog-header>
        <nav class="mt-6">
          <ul class="
            -my-2 divide-y divide-zinc-100 text-base text-zinc-800
            dark:divide-zinc-100/5 dark:text-zinc-300
          ">
            @for (item of menu(); track item) {
              <li>
                <app-nav-item [href]="item.href" (navigated)="ctx.close()">{{ item.label }}</app-nav-item>
              </li>
            }
          </ul>
        </nav>
      </hlm-dialog-content>
    </hlm-dialog>
  `,
  providers: [provideIcons({ lucideChevronDown, lucideX })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigation {
  protected readonly menu = signal(inject(Menu).getMenu()).asReadonly();
}
