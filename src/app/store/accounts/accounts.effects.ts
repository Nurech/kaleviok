import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, of } from 'rxjs';
import { AccountsService } from './accounts.service';
import { gmailSuccess } from '../auth/auth.actions';
import { saveAccount, saveAccountFailure, saveAccountSuccess } from './accounts.actions';

@Injectable()
export class AccountsEffects {
  private actions$ = inject(Actions);
  private accountsService = inject(AccountsService);

  saveAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveAccount, gmailSuccess),
      mergeMap(({ account }) =>
        this.accountsService.save(account).pipe(
          map((savedAccount) => saveAccountSuccess({ account: savedAccount })),
          catchError((error) => of(saveAccountFailure({ error }))),
        ),
      ),
    ),
  );
}
