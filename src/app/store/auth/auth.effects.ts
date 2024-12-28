import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { User, UserMapper } from '../users/users.model';
import { emailError, emailStart, emailSuccess, gmailError, gmailStart, gmailSuccess } from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmailStart),
      mergeMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((response) => {
            const user: User = UserMapper.mapResponseToUser(response);
            return gmailSuccess({ user });
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
            const payload: User = UserMapper.mapResponseToUser(response);
            return emailSuccess({ payload });
          }),
          catchError((error) => of(emailError({ error }))),
        ),
      ),
    ),
  );
}
