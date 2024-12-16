import {tap} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SnackbarService} from '../../shared/services/snackbar.service';
import {inject, Injectable} from '@angular/core';
import {autoLogin, autoLoginFailed, autoLoginSuccess} from '../core/core.actions';

@Injectable()
export class SnackbarEffects {
  private actions$ = inject(Actions);
  private snackbarService = inject(SnackbarService);

  showLoadingSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(autoLogin),
        tap(() => {
          console.warn('autoLogin snackbar');
          this.snackbarService.openSnackbar({
            message: 'Attempting auto-login...',
            type: 'info',
          });
        })
      ),
    {dispatch: false}
  );

  showSuccessSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(autoLoginSuccess),
        tap(() => {
          this.snackbarService.dismiss();
          this.snackbarService.openSnackbar({
            message: 'Auto-login successful!',
            type: 'success',

          });
        })
      ),
    {dispatch: false}
  );

  showErrorSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(autoLoginFailed),
        tap(() => {
          this.snackbarService.dismiss();
          this.snackbarService.openSnackbar({
            message: 'Auto-login failed!',
            type: 'error',
          });
        })
      ),
    {dispatch: false}
  );
}
