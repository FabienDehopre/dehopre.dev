import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-social-link',
  template: `
    <a class="group -m-1 p-1" rel="noopener noreferrer" target="_blank" [aria-label]="label()" [href]="url()">
      <svg class="
        h-6 w-6 fill-zinc-500 transition
        group-hover:fill-zinc-600
        dark:fill-zinc-400 dark:group-hover:fill-zinc-300
      " viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg">
        <path [attr.d]="icon()"/>
      </svg>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLink {
  readonly label = input.required<string>();
  readonly url = input.required<string>();
  readonly icon = input.required<string>();
}
