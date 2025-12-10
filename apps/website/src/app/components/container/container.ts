import type { CssStyles } from '../../types/css-styles';

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ContainerInner } from './container-inner';
import { ContainerOuter } from './container-outer';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Container {
  readonly cssClass = input<string>();
  readonly cssStyles = input<CssStyles>();
}
