import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { Seo} from "./services/seo";
import {Layout} from "./components/layout/layout";

@Component({
  imports: [RouterOutlet, Layout],
  selector: 'app-root',
  templateUrl: './app.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly #seo = inject(Seo);

  constructor() {
    this.#seo.init();
  }
}
