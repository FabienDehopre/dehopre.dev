import {DOCUMENT, inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {isPlatformBrowser} from "@angular/common";
import {assertUnreachable} from "../utils";

const MEDIA = '(prefers-color-scheme: dark)' as const;
const LOCAL_STORAGE_KEY = 'theme';


@Injectable({ providedIn: 'root' })
export class DocumentElement {
  readonly #platformId = inject(PLATFORM_ID);
  readonly #document = inject(DOCUMENT);
  readonly #mediaMatcher = inject(MediaMatcher);
  readonly #currentTheme = signal<'dark' | 'light'>('light');

  setProperty(property: string, value: string) {
    this.#document.documentElement.style.setProperty(property, value);
  }

  removeProperty(property: string) {
    this.#document.documentElement.style.removeProperty(property);
  }

  initTheme() {
    if (isPlatformBrowser(this.#platformId)) {
      const theme = this.#loadFromLocalStorage() ?? this.#getSystemTheme();
      this.#setColorSheme(theme);
      this.#setThemeClass(theme);
      this.#currentTheme.set(theme);
    }
  }

  setTheme(theme: 'dark' | 'light') {
    if (isPlatformBrowser(this.#platformId)) {
      this.#setColorSheme(theme);
      this.#setThemeClass(theme);
      this.#saveToLocalStorage(theme);
      this.#currentTheme.set(theme);
    }
  }

  getCurrentTheme() {
    return this.#currentTheme.asReadonly();
  }

  #getSystemTheme() {
    return this.#mediaMatcher.matchMedia(MEDIA).matches ? 'dark' : 'light';
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
