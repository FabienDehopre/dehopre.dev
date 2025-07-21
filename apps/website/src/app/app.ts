import {ChangeDetectionStrategy, Component, DOCUMENT, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter, map, mergeMap} from "rxjs";
import {Seo} from "./services/seo";

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #document = inject(DOCUMENT);
  readonly #seo = inject(Seo);
  protected title = 'website';

  constructor() {
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
        takeUntilDestroyed()
      )
      .subscribe((data) => {
        this.#seo.updateTitle(data['title']);
        this.#seo.updateDescription(data['description']);
        this.#seo.updateOgUrl(`${this.#document.location.origin}${this.#router.url}`);
      });
  }
}
