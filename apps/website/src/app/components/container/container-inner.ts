import type { CssStyles } from '../../types/css-styles';

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { hostBinding } from 'ngxtension/host-binding';

@Component({
  selector: 'app-container-inner',
  template: `<div class="mx-auto max-w-2xl lg:max-w-5xl">
  <ng-content />
</div>
`,
  styles: `:host { display: block; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerInner {
  readonly cssClass = input<string>();
  readonly cssStyles = input<CssStyles>();
  readonly class = hostBinding('class', computed(() => `relative px-4 sm:px-8 lg:px-12 ${this.cssClass() ?? ''}`.trim()));
  readonly styles = hostBinding('style', this.cssStyles);
}
