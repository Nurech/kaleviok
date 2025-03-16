import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { debounceTime, of } from 'rxjs';
import { SettingsService } from './settings.service';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { updateSetting } from './settings.actions';

@Injectable()
export class SettingsEffects {
    private actions$ = inject(Actions);
    private settingsService = inject(SettingsService);
    private store$ = inject(Store);

    updateSetting$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(updateSetting),
                debounceTime(300),
                withLatestFrom(this.store$.pipe(select(selectAuthenticatedAccount))),
                switchMap(([{ changes }, user]) => {
                    if (!user) return of();
                    return this.settingsService.upsert(user.uid, changes);
                }),
                catchError((error) => {
                    console.error('Error updating setting:', error);
                    return of();
                })
            ),
        { dispatch: false }
    );
}
