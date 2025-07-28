import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Container} from "../../components/container/container";
import {BasePage} from "../base-page";

@Component({
  selector: 'app-home',
  imports: [Container],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home extends BasePage {}
