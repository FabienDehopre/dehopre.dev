import {UrlTree} from "@angular/router";

export type MenuItem = { label: string; href: readonly any[] | string | UrlTree | null | undefined };

export function isMenuItem(value: unknown): value is MenuItem {
  return typeof value === 'object' &&
    value !== null &&
    'label' in value &&
    typeof value.label === 'string' &&
    'href' in value;
}
