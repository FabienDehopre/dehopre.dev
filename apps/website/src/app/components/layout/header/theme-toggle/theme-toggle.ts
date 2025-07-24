import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styles: `:host { display: contents; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggle {
  readonly theme = input.required<'dark' | 'light'>();
  readonly otherTheme = computed(() => this.theme() === 'dark' ? 'light' : 'dark');
  readonly setTheme = output<'dark' | 'light'>();
}
