import {catchError, map, mergeMap, of, switchMap, tap} from 'rxjs';
import {
  autoLogin, autoLoginFailed, autoLoginSuccess,
  loginSuccess, navigateTo, openBottomSheet,
  startGmailAuthentication,
  startGmailAuthenticationError,
  startGmailAuthenticationSuccess
} from './core.actions';
import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../shared/services/auth.service';
import {DataService} from '../../shared/services/data.service';
import {User, UserMapper} from '../user/user.model';
import {Router} from '@angular/router';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetComponent} from '../../shared/components/bottom-sheet/bottom-sheet.component';

@Injectable()
export class CoreEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private bottomSheet = inject(MatBottomSheet);
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
      tap(({payload}) => {
        this.dataService.saveUserToFirestore(payload.uid, payload);
      }),
      map(({payload}) => {
        return loginSuccess({payload});
      })
    )
  );

  navigateTo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateTo),
        tap(({path}) => this.router.navigate([path]))
      ),
    {dispatch: false}
  );

  openBottomSheet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openBottomSheet),
        tap(({component}) => {
          this.bottomSheet.open(BottomSheetComponent, {
            data: {component},
          });
        })
      ),
    {dispatch: false}
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => {
            return autoLoginSuccess({user});
          }),
          catchError((error) => of(autoLoginFailed({error})))
        )
      )
    ));

}
