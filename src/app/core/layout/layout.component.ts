import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DeviceService } from '../../shared/services/device.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    SidenavComponent,
    MatTabsModule,
    NgTemplateOutlet,
  ],
})
export class LayoutComponent {
  isHandset$ = inject(DeviceService).isHandset$;
}
