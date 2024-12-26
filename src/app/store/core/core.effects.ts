import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  autoLogin,
  autoLoginFailed,
  autoLoginSuccess,
  closeCookieDialog,
  loginSuccess,
  navigateTo,
  openBottomSheet,
  openCookieDialog,
  startEmailPasswordAuthentication,
  startEmailPasswordAuthenticationError,
  startEmailPasswordAuthenticationSuccess,
  startGmailAuthentication,
  startGmailAuthenticationError,
  startGmailAuthenticationSuccess,
} from './core.actions';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../shared/services/auth.service';
import { DataService } from '../../shared/services/data.service';
import { User, UserMapper } from '../user/user.model';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarState, SnackbarType } from '../../shared/models';
import { DialogService } from '../../shared/services/dialog.service';

@Injectable()
export class CoreEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private bottomSheet = inject(MatBottomSheet);
  private dataService = inject(DataService);
  private snackbarService = inject(SnackbarService);
  private translate = inject(TranslateService);
  private dialogService = inject(DialogService);

  openCookieDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openCookieDialog),
        tap(() => {
          this.dialogService.openCookieDialog();
        }),
      ),
    { dispatch: false },
  );

  closeCookieDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(closeCookieDialog),
        tap(() => {
          this.dialogService.closeCookieDialog();
        }),
      ),
    { dispatch: false },
  );

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGmailAuthentication),
      mergeMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((response) => {
            const payload: User = UserMapper.mapResponseToUser(response);
            return startGmailAuthenticationSuccess({ payload });
          }),
          catchError((error) => of(startGmailAuthenticationError({ error }))),
        ),
      ),
    ),
  );

  loginWithEmailAndPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startEmailPasswordAuthentication),
      mergeMap(({ email, password }) =>
        this.authService.loginWithEmail(email, password).pipe(
          map((response) => {
            const payload: User = UserMapper.mapResponseToUser(response);
            return startEmailPasswordAuthenticationSuccess({ payload });
          }),
          catchError((error) => of(startEmailPasswordAuthenticationError({ error }))),
        ),
      ),
    ),
  );

  saveUserToFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startGmailAuthenticationSuccess),
      tap(({ payload }) => {
        this.dataService.saveUserToFirestore(payload.uid, payload);
      }),
      map(({ payload }) => {
        return loginSuccess({ payload });
      }),
    ),
  );

  navigateTo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateTo),
        tap(({ path }) => this.router.navigate([path])),
      ),
    { dispatch: false },
  );

  openBottomSheet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openBottomSheet),
        tap(({ component }) => {
          this.bottomSheet.open(BottomSheetComponent, {
            data: { component },
          });
        }),
      ),
    { dispatch: false },
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => {
            return autoLoginSuccess({ user });
          }),
          catchError((error) => of(autoLoginFailed({ error }))),
        ),
      ),
    ),
  );

  autoLoginStart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(autoLogin),
        tap(() => {
          const message = this.translate.instant('snackbar.autologin.start');
          this.snackbarService.snack({
            name: SnackbarType.AUTOLOGIN,
            show: true,
            state: SnackbarState.INDETERMINATE,
            message,
          });
        }),
      ),
    { dispatch: false },
  );

  autoLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(autoLoginSuccess),
        tap(() => {
          const message = this.translate.instant('snackbar.autologin.success');
          this.snackbarService.snack({
            name: SnackbarType.AUTOLOGIN,
            show: true,
            state: SnackbarState.SUCCESS,
            message,
          });
        }),
      ),
    { dispatch: false },
  );

  autoLoginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(autoLoginFailed),
        tap(({ error }) => {
          const message = this.translate.instant('snackbar.autologin.error', { error: error.message || error });
          this.snackbarService.snack({
            name: SnackbarType.AUTOLOGIN,
            show: true,
            state: SnackbarState.ERROR,
            message,
          });
        }),
      ),
    { dispatch: false },
  );
}
