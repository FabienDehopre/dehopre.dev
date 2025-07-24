import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-navigation',
  imports: [CommonModule],
  templateUrl: './mobile-navigation.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigation {}
