import type { CssStyles } from '../../../../types/css-styles';

import { NgOptimizedImage } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './avatar.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  readonly large = input(false, { transform: booleanAttribute });
  readonly cssClass = input('');
  readonly cssStyles = input<CssStyles>();
}
