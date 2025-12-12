import type { CssStyles } from '../../../../types/css-styles';

import { NgOptimizedImage } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, untracked } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <a aria-label="Home" [class]="cssClass() + 'pointer-events-auto'" [routerLink]="['/']" [style]="cssStyles()">
      <img
        alt="Picture of Fabien Dehopré"
        ngSrc="/images/avatar.jpg"
        priority
        [class]="imageCssClass()"
        [height]="size()"
        [width]="size()"
      />
      <!--
        [sizes]="large() ? '4rem' : '2.25rem'"
      -->
    </a>
  `,
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  protected readonly imageCssClass = computed(() => {
    const large = this.large();
    return untracked(() => `rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 ${large ? 'h-16 w-16' : 'h-9 w-9'}`);
  });

  protected readonly size = computed(() => {
    const large = this.large();
    return untracked(() => {
      const remSize = large ? 4 : 2.25;
      return remSize * 16;
    });
  });

  readonly large = input(false, { transform: booleanAttribute });
  readonly cssClass = input('');
  readonly cssStyles = input<CssStyles>();
}
