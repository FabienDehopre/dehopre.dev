import type { CssStyles } from '../../types/css-styles';

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { hostBinding } from 'ngxtension/host-binding';

@Component({
  selector: 'app-container-outer',
  template: `
    <div class="
      mx-auto w-full max-w-7xl
      lg:px-8
    ">
      <ng-content />
    </div>
  `,
  styles: `:host { display: block; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerOuter {
  readonly cssClass = input<string>();
  readonly cssStyles = input<CssStyles>();
  readonly class = hostBinding('class', computed(() => `sm:px-8 ${this.cssClass() ?? ''}`.trim()));
  readonly style = hostBinding('style', this.cssStyles);
}
