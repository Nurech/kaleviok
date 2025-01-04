import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FirebaseError } from '@angular/fire/app';
import { TranslateService } from '@ngx-translate/core';
import { Snackbar, SnackbarType } from '../../shared/models/snackbar-model';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  snackbarService = inject(SnackbarService);
  translate = inject(TranslateService);
  DEFAULT_DURATION = 5000;

  isFirebaseError(error: unknown): error is FirebaseError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      (error as { name: unknown }).name === 'FirebaseError'
    );
  }

  handleError(error: any) {
    if (this.isFirebaseError(error)) {
      this.handleFirebaseError(error);
    } else if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      console.error('Unknown error', JSON.stringify(error));
    }
  }

  private handleFirebaseError(error: FirebaseError): void {
    const firebaseErrorCodeMap: Record<string, number> = {
      'auth/email-already-in-use': 400,
    };

    const code = firebaseErrorCodeMap[error.code] || 500;
    const message = error.code;

    if (code < 500) {
      const snack = new Snackbar();
      snack.message = message;
      snack.type = SnackbarType.WARN;
      snack.duration = 50000;
      if (error.code === 'auth/email-already-in-use') {
        snack.action = { type: 'link', link: '/forgot-password', buttonText: 'forgot_password' };
      }
      this.snackbarService.open(snack);
    } else {
      const snack = new Snackbar();
      snack.message = message;
      snack.type = SnackbarType.ERROR;
      snack.duration = 5000;

      this.snackbarService.open(snack);
    }
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status < 500) {
      const snack = new Snackbar();
      snack.message = error.error.message;
      snack.type = SnackbarType.WARN;
      snack.duration = 5000;
      this.snackbarService.open(snack);
    } else {
      const snack = new Snackbar();
      snack.message = error.error.message;
      snack.type = SnackbarType.ERROR;
      snack.duration = 5000;
      this.snackbarService.open(snack);
    }
  }
}
