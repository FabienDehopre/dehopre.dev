import {DOCUMENT, inject, Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Body {
  readonly #document = inject(DOCUMENT);

  setProperty(property: string, value: string) {
    this.#document.documentElement.style.setProperty(property, value);
  }

  removeProperty(property: string) {
    this.#document.documentElement.style.removeProperty(property);
  }
}
