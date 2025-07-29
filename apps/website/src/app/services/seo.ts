import {DOCUMENT, inject, Injectable} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {isMetaInfo, MetaInfo} from "../types/meta-info";
import {filter, map, mergeMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({ providedIn: 'root' })
export class Seo {
  readonly #title = inject(Title);
  readonly #meta = inject(Meta);
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #document = inject(DOCUMENT);

  init() {
    this.#router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.#activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data),
        map((data) => data['meta']),
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
