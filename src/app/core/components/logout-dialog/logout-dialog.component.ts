import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, TranslatePipe],
  templateUrl: './logout-dialog.component.html',
  styles: ``,
})
export class LogoutDialogComponent {
  private store$ = inject(Store);
  onLogout() {
    this.store$.dispatch(logout());
  }
}
