import type { Signal } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { DestroyRef, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { assertUnreachable } from '../utils';

const MEDIA = '(prefers-color-scheme: dark)' as const;
const LOCAL_STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class Theme {
  readonly #destroyRef = inject(DestroyRef);
  readonly #document = inject(DOCUMENT);
  readonly #platform = inject(Platform);
  readonly #breakpointsObserver = inject(BreakpointObserver);
  readonly #currentTheme = signal<'dark' | 'light'>('light');

  setProperty(property: string, value: string): void {
    this.#document.documentElement.style.setProperty(property, value);
  }

  removeProperty(property: string): void {
    this.#document.documentElement.style.removeProperty(property);
  }

  initTheme(): void {
    if (this.#platform.isBrowser) {
      const themeName = this.#loadFromLocalStorage() ?? this.#getSystemTheme();
      const isSystem = themeName === 'system';
      const theme = isSystem ? this.#getSystemTheme() : themeName;
      this.#setTheme(theme);
      this.#startSystemThemeObserver();
    }
  }

  setTheme(theme: 'dark' | 'light'): void {
    if (this.#platform.isBrowser) {
      this.#setTheme(theme);
      this.#saveToLocalStorage(theme);
    }
  }

  getCurrentTheme(): Signal<'dark' | 'light'> {
    return this.#currentTheme.asReadonly();
  }

  #startSystemThemeObserver(): void {
    this.#breakpointsObserver.observe(MEDIA)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((value) => {
        const systemTheme = value.matches ? 'dark' : 'light';
        const themeName = this.#loadFromLocalStorage() ?? this.#getSystemTheme();
        const isSystem = themeName === 'system';
        if (isSystem) {
          this.#setTheme(systemTheme);
        }
      });
  }

  #setTheme(theme: 'dark' | 'light') {
    this.#setColorSheme(theme);
    this.#setThemeClass(theme);
    this.#currentTheme.set(theme);
  }

  #getSystemTheme() {
    return this.#breakpointsObserver.isMatched(MEDIA) ? 'dark' : 'light';
  }

  #setColorSheme(theme: 'dark' | 'light') {
    this.#document.documentElement.style.colorScheme = theme;
  }

  #setThemeClass(theme: 'dark' | 'light') {
    const otherTheme = this.#getOtherTheme(theme);
    this.#document.documentElement.classList.remove(otherTheme);
    if (!this.#document.documentElement.classList.contains(theme)) {
      this.#document.documentElement.classList.add(theme);
    }
  }

  #getOtherTheme(theme: 'dark' | 'light') {
    switch (theme) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
      default:
        return assertUnreachable(theme);
    }
  }

  #saveToLocalStorage(theme: 'dark' | 'light') {
    const themeToStore = this.#getSystemTheme() === theme ? 'system' : theme;
    this.#document.defaultView?.localStorage.setItem(LOCAL_STORAGE_KEY, themeToStore);
  }

  #loadFromLocalStorage(): 'dark' | 'light' | 'system' | undefined {
    const stored = this.#document.defaultView?.localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored && ['dark', 'light', 'system'].includes(stored)
      ? stored as 'dark' | 'light' | 'system'
      : undefined;
  }
}
