import {Component} from '@angular/core';
import {LayoutComponent} from './layout/layout.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-lib-usage',
  templateUrl: 'lib-usage.component.html',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
})
export class LibUsageComponent {}
