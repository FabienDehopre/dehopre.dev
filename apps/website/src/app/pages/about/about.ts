import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Container} from "../../components/container/container";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-about',
  imports: [Container],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About extends BasePage {}
