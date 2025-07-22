import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
