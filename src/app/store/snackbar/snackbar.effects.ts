import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from './snackbar.service';
import { emailRegisterError, logout } from '../auth/auth.actions';
import { Snackbar, SnackbarType } from './snackbar.model';

@Injectable()
export class SnackbarEffects {
  private actions$ = inject(Actions);
  private snackbarService = inject(SnackbarService);
  private translate = inject(TranslateService);

  isFirebaseError(error: unknown): error is FirebaseError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      (error as { name: unknown }).name === 'FirebaseError'
    );
  }

  interceptError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(emailRegisterError),
        tap((action) => {
          if (this.isFirebaseError(action.error)) {
            const snack = new Snackbar();
            snack.type = SnackbarType.WARN;
            snack.message = this.translate.instant(action.error.code);
            snack.duration = 5000;
            snack.action = { type: 'close' };

            if (action.error.code === 'auth/email-already-in-use') {
              snack.action.type = 'link';
              snack.action.link = '/forgot-password';
              snack.action.buttonText = this.translate.instant('forgot_password');
            }

            this.snackbarService.open(snack);
          }
        }),
      ),
    { dispatch: false },
  );

  showSnackbar = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          console.log('Logging out');
          this.snackbarService.open(
            new Snackbar(SnackbarType.SUCCESS, this.translate.instant('you_have_been_logged_out')),
          );
        }),
      ),
    { dispatch: false },
  );
}
