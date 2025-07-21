import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
