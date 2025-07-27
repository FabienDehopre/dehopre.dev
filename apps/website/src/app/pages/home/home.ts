import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Container} from "../../components/container/container";

@Component({
  selector: 'app-home',
  imports: [
    Container
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
