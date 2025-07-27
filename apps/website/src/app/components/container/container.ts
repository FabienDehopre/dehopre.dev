import {ChangeDetectionStrategy, Component, input} from "@angular/core";
import {ContainerInner} from "./container-inner";
import {ContainerOuter} from "./container-outer";
import {ConditionalExcept} from "type-fest";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- we want to remove any method from the type
export type CssStyles = Partial<ConditionalExcept<CSSStyleDeclaration, Function>>;

@Component({
  selector: 'app-container',
  imports: [ContainerInner, ContainerOuter],
  template: `
    <app-container-outer [cssClass]="cssClass()" [cssStyles]="cssStyles()">
      <app-container-inner>
        <ng-content />
      </app-container-inner>
    </app-container-outer>
  `,
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Container {
  readonly cssClass = input<string>();
  readonly cssStyles = input<CssStyles>();
}
