import {inject, Injectable} from '@angular/core';
import {Router, UrlTree} from "@angular/router";

export type MenuItem = { label: string; href: readonly any[] | string | UrlTree | null | undefined };
function isMenuItem(value: unknown): value is MenuItem {
  return typeof value === 'object' &&
    value !== null &&
    'label' in value &&
    typeof value.label === 'string' &&
    'href' in value;
}

@Injectable({ providedIn: 'root' })
export class Menu {
  readonly #router = inject(Router);

  getMenuFromRouterConfig(): MenuItem[] {
    return this.#router.config
      .filter((route) => route.data && 'menuItem' in route.data)
      .map((route) => route.data?.['menuItem'])
      .filter(isMenuItem);
  }
}
