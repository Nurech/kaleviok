import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of } from 'rxjs';
import { AccountsService } from './accounts.service';
import { googleSuccess } from '../auth/auth.actions';
import { saveAccountFailure, saveAccountSuccess } from './accounts.actions';

@Injectable()
export class AccountsEffects {
  private actions$ = inject(Actions);
  private accountsService = inject(AccountsService);

  saveAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleSuccess),
      mergeMap(({ account }) =>
        this.accountsService.get(account.uid).pipe(
          mergeMap((existingAccount) => {
            if (existingAccount) return of();
            // Account does not exist, save it
            return this.accountsService.save(account).pipe(
              map((savedAccount) => saveAccountSuccess({ account: savedAccount })),
              catchError((error) => of(saveAccountFailure({ error }))),
            );
          }),
          catchError((error) => of(saveAccountFailure({ error }))),
        ),
      ),
    ),
  );
}
