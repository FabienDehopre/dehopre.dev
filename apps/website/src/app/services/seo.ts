import {DOCUMENT, inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

export type MetaInfo = { title: string; description: string };
export function isMetaInfo(value: unknown): value is MetaInfo {
  return typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    typeof value.title === 'string' &&
    'description' in value &&
    typeof value.description === 'string';
}

@Injectable({ providedIn: 'root' })
export class Seo {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);
  readonly #router = inject(Router);
  readonly #document = inject(DOCUMENT);

  updateMetaData(meta: MetaInfo) {
    this.#updateTitle(meta.title);
    this.#updateDescription(meta.description);
    this.#updateOgUrl(`${this.#document.location.origin}${this.#router.url}`);
  }

  updateNoMetaData() {
    this.#updateTitle('Fabien Dehopré');
    this.#updateDescription('');
    this.#updateOgUrl(`${this.#document.location.origin}${this.#router.url}`);
  }

  #updateTitle(title: string) {
    this.#title.setTitle(title);
  }

  #updateDescription(content: string) {
    this.#meta.updateTag({ name: 'description', content });
  }

  #updateOgUrl(content: string) {
    this.#meta.updateTag({ name: 'og:url', content });
  }
}
