import {DOCUMENT, inject, Injectable, signal} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {assertUnreachable} from "../utils";
import {Platform} from "@angular/cdk/platform";

const MEDIA = '(prefers-color-scheme: dark)' as const;
const LOCAL_STORAGE_KEY = 'theme';


@Injectable({ providedIn: 'root' })
export class Theme {
  readonly #document = inject(DOCUMENT);
  readonly #platform = inject(Platform);
  readonly #breakpointsObserver = inject(BreakpointObserver);
  readonly #currentTheme = signal<'dark' | 'light'>('light');

  setProperty(property: string, value: string) {
    this.#document.documentElement.style.setProperty(property, value);
  }

  removeProperty(property: string) {
    this.#document.documentElement.style.removeProperty(property);
  }

  initTheme() {
    if (this.#platform.isBrowser) {
      const theme = this.#loadFromLocalStorage() ?? this.#getSystemTheme();
      this.#setTheme(theme);
    }
  }

  setTheme(theme: 'dark' | 'light') {
    if (this.#platform.isBrowser) {
      this.#setTheme(theme);
      this.#saveToLocalStorage(theme);
    }
  }

  getCurrentTheme() {
    return this.#currentTheme.asReadonly();
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

  // #getOtherTheme(theme: 'dark'): 'light';
  // #getOtherTheme(theme: 'light'): 'dark';
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
    this.#document.defaultView?.localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  }

  #loadFromLocalStorage(): 'dark' | 'light' | undefined {
    return this.#document.defaultView?.localStorage.getItem(LOCAL_STORAGE_KEY) as 'dark' | 'light' | undefined;
  }
}
