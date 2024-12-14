import {BreakpointObserver} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {Component, inject, output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DarkModeSwitchComponent} from '../../shared/components/dark-mode-switch/dark-mode-switch.component';
import {MenuService} from '../../shared/services/menu.service';
import {DeviceService} from '../../shared/services/device.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    AsyncPipe,
    DarkModeSwitchComponent,
    TranslatePipe,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  isHandset$ = inject(DeviceService).isHandset$;
  closeDrawer = output();
  readonly rootMenuItems = inject(MenuService).rootMenuItems;
  private breakpointObserver = inject(BreakpointObserver);
}
