import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Container} from "../../components/container/container";

@Component({
  selector: 'app-about',
  imports: [CommonModule, Container],
  templateUrl: './about.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
