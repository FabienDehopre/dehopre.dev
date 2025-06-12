import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-analog-welcome',
  imports: [NgOptimizedImage],
  templateUrl: './analog-welcome.html',
  styleUrl: './analog-welcome.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalogWelcome {
  count = 0;
  increment(): void {
    this.count += 1;
  }
}
