import {inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class Seo {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);

  updateTitle(title: string) {
    this.#title.setTitle(title);
  }

  updateDescription(content: string) {
    this.#meta.updateTag({ name: 'description', content });
  }

  updateOgUrl(content: string) {
    this.#meta.updateTag({ name: 'og:url', content });
  }
}
