import type { UrlTree } from '@angular/router';

export interface MenuItem { label: string; href: UrlTree | string | readonly unknown[] | null | undefined }

/**
 *
 * @param value
 */
export function isMenuItem(value: unknown): value is MenuItem {
  return typeof value === 'object' &&
    value !== null &&
    'label' in value &&
    typeof value.label === 'string' &&
    'href' in value;
}
