import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { Snackbar, SnackbarType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private translate = inject(TranslateService);
  private snackBar = inject(MatSnackBar);

  open(obj: string | Snackbar) {
    if (typeof obj === 'string') {
      const defaultSnackbar = new Snackbar(SnackbarType.INFO, obj, 3000);
      this.snack(defaultSnackbar);
    } else {
      this.snack(obj);
    }
  }

  private snack(snackbar: Snackbar) {
    // Translate the message if provided
    if (snackbar.message) {
      snackbar.message = this.translate.instant(snackbar.message);
    }

    snackbar.self = this.snackBar;

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: snackbar,
      duration: snackbar.duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: `snackbar-${snackbar.type?.toLowerCase()}`,
    });
  }
}
