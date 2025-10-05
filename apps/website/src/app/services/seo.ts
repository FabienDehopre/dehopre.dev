import type { MetaInfo } from '../types/meta-info';

import { DOCUMENT, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

import { isMetaInfo } from '../types/meta-info';

@Injectable({ providedIn: 'root' })
export class Seo {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #document = inject(DOCUMENT);

  init(): void {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.#activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((data) => data['meta'] as unknown),
        takeUntilDestroyed()
      )
      .subscribe((data) => {
        if (isMetaInfo(data)) {
          this.#updateMetaData(data);
        } else {
          console.warn('Invalid meta data info in route data for url: ', this.#router.url);
          this.#updateNoMetaData();
        }
      });
  }

  #updateMetaData(meta: MetaInfo) {
    this.#updateTitle(meta.title, meta.titleFormat ?? '%s - Fabien Dehopré');
    this.#updateDescription(meta.description);
    this.#updateOgUrl(`${this.#document.location.origin}${this.#router.url}`);
  }

  #updateNoMetaData() {
    this.#updateTitle('Fabien Dehopré', '%s');
    this.#updateDescription('');
    this.#updateOgUrl(`${this.#document.location.origin}${this.#router.url}`);
  }

  #updateTitle(title: string, format: string) {
    this.#title.setTitle(format.replace('%s', title));
  }

  #updateDescription(content: string) {
    this.#meta.updateTag({ name: 'description', content });
  }

  #updateOgUrl(content: string) {
    this.#meta.updateTag({ name: 'og:url', content });
  }
}
