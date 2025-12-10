import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

import { Menu } from '../../../../services/menu';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-mobile-navigation',
  imports: [ButtonDirective, ButtonLabel, ButtonIcon, Dialog, NavItem],
  template: `
    <div #container>
      <button
        class="
          group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm
          font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5
          ring-zinc-900/5 backdrop-blur-sm
          dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10
          dark:hover:ring-white/20
        "
        pButton
        type="button"
        [attr.aria-expanded]="menuVisible()"
        (click)="toggleMenu()"
      >
        <span pButtonLabel>Menu</span>
        <svg
          aria-hidden="true"
          class="
            ml-3 h-auto w-2 stroke-zinc-500
            group-hover:stroke-zinc-700
            dark:group-hover:stroke-zinc-400
          "
          pButtonIcon
          viewBox="0 0 8 6"
        >
          <path
            d="M1.75 1.75 4 4.25l2.25-2.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </button>
      <p-dialog
        maskStyleClass="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/80"
        styleClass="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
        [appendTo]="container"
        [(visible)]="menuVisible"
      >
        <ng-template #headless>
          <div class="flex flex-row-reverse items-center justify-between">
            <button aria-label="Close menu" class="-m-1 p-1" pButton type="button" (click)="toggleMenu()">
              <svg aria-hidden="true" class="
                h-6 w-6 text-zinc-500
                dark:text-zinc-400
              " pButtonIcon viewBox="0 0 24 24">
                <path
                  d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
            </button>
            <h2 class="
              text-sm font-medium text-zinc-600
              dark:text-zinc-400
            ">Navigation</h2>
          </div>
          <nav class="mt-6">
            <ul class="
              -my-2 divide-y divide-zinc-100 text-base text-zinc-800
              dark:divide-zinc-100/5 dark:text-zinc-300
            ">
              @for (item of menu(); track item) {
                <li>
                  <app-nav-item [href]="item.href" (navigated)="onNavigated()">{{ item.label }}</app-nav-item>
                </li>
              }
            </ul>
          </nav>
        </ng-template>
      </p-dialog>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigation {
  protected readonly menu = signal(inject(Menu).getMenuFromRouterConfig()).asReadonly();
  protected readonly menuVisible = signal(false);

  protected toggleMenu(): void {
    this.menuVisible.update((value) => !value);
  }

  protected onNavigated(): void {
    this.menuVisible.set(false);
  }
}
