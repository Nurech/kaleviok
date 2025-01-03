import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Account, UserMapper } from '../accounts/account.model';
import {
  manualLogin,
  emailError,
  emailStart,
  emailSuccess,
  googleError,
  googleStart,
  googleSuccess,
} from './auth.actions';
import { AuthService } from './auth.service';
import { updateMySettings } from '../settings/settings.actions';
import { LoginMethod } from '../settings/settings.model';
import { LoginComponent } from '../../core/components/login/login.component';
import { SheetService } from '../../shared/services/sheet.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store);
  private authService = inject(AuthService);
  private sheetService = inject(SheetService);

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleStart),
      mergeMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((response) => {
            const account: Account = UserMapper.mapUserCredentialToUser(response);
            this.store$.dispatch(updateMySettings({ changes: { loginMethod: LoginMethod.Google } }));
            return googleSuccess({ account });
          }),
          catchError((error) => of(googleError({ error }))),
        ),
      ),
    ),
  );

  loginWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(emailStart),
      mergeMap(({ email, password }) =>
        this.authService.loginWithEmail(email, password).pipe(
          map((response) => {
            const payload: Account = UserMapper.mapUserCredentialToUser(response);
            return emailSuccess({ payload });
          }),
          catchError((error) => of(emailError({ error }))),
        ),
      ),
    ),
  );

  manualLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(manualLogin),
        tap(() => {
          this.sheetService.open(LoginComponent);
        }),
      ),
    { dispatch: false },
  );
}
