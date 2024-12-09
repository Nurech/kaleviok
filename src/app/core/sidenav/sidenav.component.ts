import {BreakpointObserver} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {Component, inject, output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DarkModeSwitchComponent} from '../../shared/components/dark-mode-switch/dark-mode-switch.component';
import {CopyURLComponent} from '../../shared/components/copy-url/copy-url.component';
import {MenuService} from '../../shared/services/menu.service';
import {DeviceService} from '../../shared/services/device.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    AsyncPipe,
    DarkModeSwitchComponent,
    CopyURLComponent,
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
