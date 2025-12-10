import type { MenuItem } from '../types/menu-item';

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { isMenuItem } from '../types/menu-item';

@Injectable({ providedIn: 'root' })
export class Menu {
  private readonly router = inject(Router);

  getMenuFromRouterConfig(): MenuItem[] {
    return this.router.config
      .filter((route) => route.data && 'menuItem' in route.data)
      .map((route) => route.data?.['menuItem'] as unknown)
      .filter(isMenuItem);
  }
}
