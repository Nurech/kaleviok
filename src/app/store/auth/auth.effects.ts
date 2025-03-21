import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Account, UserMapper } from '../accounts/account.model';
import {
    manualLogin,
    emailError,
    emailStart,
    emailSuccess,
    googleError,
    googleStart,
    googleSuccess,
    logout,
    emailRegisterStart,
    emailRegisterSuccess,
    emailRegisterError,
    authChanged,
    firebaseSuccess
} from './auth.actions';
import { AuthService } from './auth.service';
import { LoginComponent } from '../../core/components/login/login.component';
import { SheetService } from '../../shared/services/sheet.service';
import { openSnackbar } from '../snackbar/snackbar.actions';

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private store$ = inject(Store);
    private authService = inject(AuthService);
    private sheetService = inject(SheetService);
    private translate = inject(TranslateService);

    loginWithGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(googleStart),
            mergeMap(() =>
                this.authService.loginWithGoogle().pipe(
                    map((response) => {
                        const account: Account = UserMapper.mapUserCredentialToUser(response);
                        return googleSuccess({ payload: account });
                    }),
                    catchError((error) => of(googleError({ error })))
                )
            )
        )
    );

    onAuthChanged$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authChanged),
                tap(({ payload }) => {
                    if (payload) {
                        const provider = payload.providerId;
                        if (provider === 'google.com') {
                            this.store$.dispatch(googleSuccess({ payload }));
                        } else if (provider === 'email') {
                            this.store$.dispatch(emailSuccess({ payload }));
                        } else if (provider === 'firebase') {
                            this.store$.dispatch(firebaseSuccess({ payload }));
                        }
                    }
                })
            ),
        { dispatch: false }
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
                    catchError((error) => of(emailError({ error })))
                )
            )
        )
    );

    manualLogin$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(manualLogin),
                tap(() => {
                    this.sheetService.open(LoginComponent);
                })
            ),
        { dispatch: false }
    );

    onLogout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(logout),
                tap(() => {
                    this.authService.logout();
                    this.store$.dispatch(
                        openSnackbar({
                            payload: { type: 'success', message: this.translate.instant('you_have_been_logged_out') }
                        })
                    );
                })
            ),
        { dispatch: false }
    );

    registerWithEmailAndPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(emailRegisterStart),
            mergeMap(({ email, password }) =>
                this.authService.registerWithEmail(email, password).pipe(
                    map((response) => {
                        const payload: Account = UserMapper.mapUserCredentialToUser(response);
                        this.store$.dispatch(
                            openSnackbar({
                                payload: {
                                    type: 'success',
                                    message: this.translate.instant('register_email_account_success')
                                }
                            })
                        );
                        return emailRegisterSuccess({ payload });
                    }),
                    catchError((error) => of(emailRegisterError({ error })))
                )
            )
        )
    );
}
