import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkModeSwitchComponent } from '../../shared/components/dark-mode-switch/dark-mode-switch.component';
import { CopyCSSComponent } from '../../shared/components/copy-css/copy-css.component';
import { CopyURLComponent } from '../../shared/components/copy-url/copy-url.component';
import { MenuService } from '../../shared/services/menu.service';
import { DeviceService } from '../../shared/services/device.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    AsyncPipe,
    DarkModeSwitchComponent,
    CopyCSSComponent,
    CopyURLComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$ = inject(DeviceService).isHandset$;

  closeDrawer = output();

  readonly rootMenuItems = inject(MenuService).rootMenuItems;
}
