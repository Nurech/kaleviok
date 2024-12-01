import {catchError, map, mergeMap, of} from 'rxjs';
import {CoreActions} from './core.actions';
import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../../services/auth.service';

@Injectable()
export class CoreEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoreActions.startGmailAuthentication),
      mergeMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((response) => {
            const user = response.user;
            const serializedUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
            };

            this.authService.saveUserToFirestore(user.uid, serializedUser);

            return CoreActions.loginSuccess({ user: serializedUser });
          }),
          catchError((error) => of(CoreActions.gmailAuthenticationError({ error })))
        )
      )
    )
  );

}
