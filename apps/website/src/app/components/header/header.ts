import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
