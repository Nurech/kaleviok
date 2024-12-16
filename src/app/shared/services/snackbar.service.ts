import {inject, Injectable} from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);

  openSnackbar(
    data: { message: string; action?: string; type?: string },
    config?: MatSnackBarConfig
  ) {
    const defaultConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: data.type ? `snackbar-${data.type}` : undefined,
      ...config,
    };
    this.snackbar.open(data.message, data.action, defaultConfig);
  }

  dismiss() {
    this.snackbar.dismiss();
  }
}
