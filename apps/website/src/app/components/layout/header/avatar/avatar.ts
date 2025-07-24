import {booleanAttribute, ChangeDetectionStrategy, Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './avatar.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  readonly large = input(false, { transform: booleanAttribute });
  readonly containerCssClass = input('');
  readonly containerStyle = input<Partial<CSSStyleDeclaration>>();
  readonly linkCssClass = input('');
  readonly linkStyle = input<Partial<CSSStyleDeclaration>>();
}
