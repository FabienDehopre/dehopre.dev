import type { MenuItem } from '../types/menu-item';

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class Menu {
  private readonly router = inject(Router);

  getMenu(): MenuItem[] {
    return [
      {
        label: 'About',
        href: this.router.createUrlTree(['/', 'about']),
      },
    ];
  }
}
