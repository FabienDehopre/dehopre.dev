import type { CssStyles } from '../../../../types/css-styles';

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { hostBinding } from 'ngxtension/host-binding';

@Component({
  selector: 'app-avatar-container',
  template: '<ng-content />',
  styles: `:host { display: block; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarContainer {
  readonly cssClass = input<string>();
  readonly cssStyles = input<CssStyles>();
  readonly class = hostBinding('class', computed(() => `${this.cssClass() ?? ''} h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10`.trim()));
  readonly styles = hostBinding('style', this.cssStyles);
}
