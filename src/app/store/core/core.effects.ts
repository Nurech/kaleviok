import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {
  loginSuccess,
  startGmailAuthentication,
  startGmailAuthenticationError,
  startGmailAuthenticationSuccess
} from './core.actions';
import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {User, UserMapper} from '../user/user.model';

@Injectable()
export class CoreEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private dataService = inject(DataService);


  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGmailAuthentication),
      mergeMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((response) => {
            const payload: User = UserMapper.mapResponseToUser(response);
            return startGmailAuthenticationSuccess({payload});
          }),
          catchError((error) => of(startGmailAuthenticationError({error})))
        )
      )
    )
  );


  saveUserToFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGmailAuthenticationSuccess),
      tap(({ payload }) => {
        this.dataService.saveUserToFirestore(payload.uid, payload);
      }),
      map(({ payload }) => {
        return loginSuccess({ payload });
      })
    )
  );


}
