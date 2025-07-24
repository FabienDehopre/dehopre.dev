import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Footer} from "./footer/footer";
import {Header} from "./header/header";
import {DocumentElement} from "../../services/document-element";

@Component({
  selector: 'app-layout',
  imports: [Footer, Header],
  templateUrl: './layout.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  readonly #documentElement = inject(DocumentElement);
  readonly currentTheme = this.#documentElement.getCurrentTheme();

  constructor() {
    this.#documentElement.initTheme();
  }

  onSetTheme(theme: "dark" | "light") {
    this.#documentElement.setTheme(theme);
  }
}
