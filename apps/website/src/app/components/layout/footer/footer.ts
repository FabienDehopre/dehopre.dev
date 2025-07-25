import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Menu} from "../../../services/menu";

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly #menuS = inject(Menu);
  readonly menu = signal(this.#menuS.getMenuFromRouterConfig()).asReadonly();
  readonly year = new Date().getFullYear();
}
