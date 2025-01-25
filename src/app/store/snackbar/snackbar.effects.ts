import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from './snackbar.service';
import { emailRegisterError } from '../auth/auth.actions';
import { Snackbar } from './snackbar.model';
import { closeAllSnackbars, openSnackbar } from './snackbar.actions';

@Injectable()
export class SnackbarEffects {
    private actions$ = inject(Actions);
    private snackbarService = inject(SnackbarService);
    private translate = inject(TranslateService);

    isFirebaseError(error: unknown): error is FirebaseError {
        return (
            typeof error === 'object' &&
            error !== null &&
            'name' in error &&
            (error as { name: unknown }).name === 'FirebaseError'
        );
    }

    interceptError$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(emailRegisterError),
                tap((action) => {
                    if (this.isFirebaseError(action.error)) {
                        const snack: Snackbar = {
                            type: 'warn',
                            message: this.translate.instant(action.error.code),
                            duration: 5000
                        };

                        if (action.error.code === 'auth/email-already-in-use') {
                            snack.actionText = this.translate.instant('forgot_password');
                        }

                        this.snackbarService.open(snack);
                    }
                })
            ),
        { dispatch: false }
    );

    opanSnackbar = createEffect(
        () =>
            this.actions$.pipe(
                ofType(openSnackbar),
                tap(({ payload }) => {
                    if (!payload.duration) {
                        payload = { ...payload, duration: 6000 };
                    }
                    this.snackbarService.open(payload);
                })
            ),
        { dispatch: false }
    );

    closeAllSnackbars$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(closeAllSnackbars),
                tap(() => {
                    this.snackbarService.closeAll();
                })
            ),
        { dispatch: false }
    );
}
