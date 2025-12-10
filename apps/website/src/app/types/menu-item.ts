import type { UrlTree } from '@angular/router';

export interface MenuItem { label: string; href: UrlTree | string | readonly unknown[] | null | undefined }
