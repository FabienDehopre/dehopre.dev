import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AnalogWelcome } from './analog-welcome';

@Component({
  selector: 'app-home',
  imports: [AnalogWelcome],
  template: `<app-analog-welcome />
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
}
