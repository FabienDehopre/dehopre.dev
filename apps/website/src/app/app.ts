import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter, map, mergeMap} from "rxjs";
import { isMetaInfo, Seo} from "./services/seo";
import {Layout} from "./components/layout/layout";

@Component({
  imports: [RouterModule, Layout],
  selector: 'app-root',
  templateUrl: './app.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #seo = inject(Seo);
  /** @deprecated */
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
        map((data) => data['meta']),
        takeUntilDestroyed()
      )
      .subscribe((data) => {
        if (isMetaInfo(data)) {
          this.#seo.updateMetaData(data);
        } else {
          console.error('Invalid meta data info in route data for url: ', this.#router.url);
          this.#seo.updateNoMetaData();
        }
      });
  }
}
