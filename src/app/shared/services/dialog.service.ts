import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieDialogComponent } from '../../core/components/cookie-dialog/cookie-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  openCookieDialog() {
    this.dialog.open(CookieDialogComponent, {
      disableClose: true,
    });
  }

  closeCookieDialog() {
    this.dialog.closeAll();
  }
}
