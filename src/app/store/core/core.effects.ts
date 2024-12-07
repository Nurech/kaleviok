import {catchError, map, mergeMap, of, tap} from 'rxjs';
import {startGmailAuthentication, startGmailAuthenticationError, startGmailAuthenticationSuccess} from './core.actions';
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
            const user: User = UserMapper.mapResponseToUser(response);
            return startGmailAuthenticationSuccess({user});
          }),
          catchError((error) => of(startGmailAuthenticationError({error})))
        )
      )
    )
  );


  saveUserToFirestore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startGmailAuthenticationSuccess),
        tap(({ user }) => {
          this.dataService.saveUserToFirestore(user.uid, user);
        })
      ),
    { dispatch: false }
  );

}
