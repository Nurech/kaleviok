import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap, of } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Account, UserMapper } from '../accounts/account.model';
import { autologin, emailError, emailStart, emailSuccess, gmailError, gmailStart, gmailSuccess } from './auth.actions';
import { AuthService } from './auth.service';
import { selectMySettings } from '../settings/settings.selectors';
import { updateSettings } from '../settings/settings.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store);
  private authService = inject(AuthService);

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmailStart),
      mergeMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((response) => {
            console.error('Response from loginWithGoogle:', response);
            const account: Account = UserMapper.mapUserCredentialToUser(response);
            this.store$.dispatch(updateSettings({ changes: { loginMethod: 'google' } }));
            return gmailSuccess({ account });
          }),
          catchError((error) => of(gmailError({ error }))),
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
          if (settings.loginMethod === 'google') {
            return gmailStart();
          }
        }
        return null;
      }),
      filter((action) => action !== null),
    ),
  );
}
