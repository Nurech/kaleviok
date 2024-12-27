import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DeviceService } from '../../shared/services/device.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { SnackbarState, SnackbarType } from '../../shared/models';
import { RouterOutlet } from '@angular/router';

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
    RouterOutlet,
  ],
})
export class LayoutComponent {
  isHandheld = inject(DeviceService).isHandheld;
  snackbarService = inject(SnackbarService);

  opanSnackBar() {
    this.snackbarService.snack({
      name: SnackbarType.AUTOLOGIN,
      show: true,
      state: SnackbarState.INDETERMINATE,
      message: 'Logging in...',
    });
  }

  opanSnackBarSuccess() {
    this.snackbarService.snack({
      name: SnackbarType.AUTOLOGIN,
      show: true,
      state: SnackbarState.SUCCESS,
      message: 'Login successful!',
    });
  }
}
