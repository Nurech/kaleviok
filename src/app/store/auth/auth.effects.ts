import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, of } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Account, UserMapper } from '../accounts/account.model';
import {
  autologin,
  emailError,
  emailStart,
  emailSuccess,
  googleError,
  googleStart,
  googleSuccess,
} from './auth.actions';
import { AuthService } from './auth.service';
import { selectMySettings } from '../settings/settings.selectors';
import { updateSettings } from '../settings/settings.actions';
import { LoginMethod } from '../settings/settings.model';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store);
  private authService = inject(AuthService);

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleStart),
      mergeMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((response) => {
            console.error('Response from loginWithGoogle:', response);
            const account: Account = UserMapper.mapUserCredentialToUser(response);
            this.store$.dispatch(updateSettings({ changes: { loginMethod: LoginMethod.Google } }));
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

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autologin),
      withLatestFrom(this.store$.select(selectMySettings)),
      map(([, settings]) => {
        if (settings.autologin) {
          if (settings.loginMethod === LoginMethod.Google) {
            return googleStart();
          }
        }
        return null;
      }),
      filter((action) => action !== null),
    ),
  );
}
