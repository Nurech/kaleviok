import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { map, catchError, mergeMap, of } from 'rxjs';
import { AccountsService } from './accounts.service';
import { emailSuccess, firebaseSuccess, googleSuccess } from '../auth/auth.actions';
import { saveAccountFailure, saveAccountSuccess, startAccountsListener, stopAccountsListener } from './accounts.actions';
import { LoginComponent } from '../../core/components/login/login.component';
import { SheetService } from '../../shared/services/sheet.service';

@Injectable()
export class AccountsEffects implements OnInitEffects {
    private actions$ = inject(Actions);
    private accountsService = inject(AccountsService);
    private sheetService = inject(SheetService);

    ngrxOnInitEffects() {
        return startAccountsListener();
    }

    saveAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(googleSuccess, emailSuccess, firebaseSuccess),
            mergeMap(({ payload }) =>
                this.accountsService.get(payload.uid).pipe(
                    mergeMap((existingAccount) => {
                        this.sheetService.close(LoginComponent);
                        if (existingAccount) return of();
                        // Account does not exist, save it
                        return this.accountsService.save(payload).pipe(
                            map((savedAccount) => saveAccountSuccess({ payload: savedAccount })),
                            catchError((error) => of(saveAccountFailure({ error })))
                        );
                    }),
                    catchError((error) => of(saveAccountFailure({ error })))
                )
            )
        )
    );

    startListener$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(startAccountsListener),
                map(() => this.accountsService.startListen())
            ),
        { dispatch: false }
    );

    stopListener$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(stopAccountsListener),
                map(() => this.accountsService.stopListen())
            ),
        { dispatch: false }
    );
}
