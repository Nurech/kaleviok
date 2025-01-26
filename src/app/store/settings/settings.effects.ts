import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { debounceTime, of } from 'rxjs';
import { SettingsService } from './settings.service';
import { getUserSettings, updateSetting, updateSettingSuccess, updateSettingFailure } from './settings.actions';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { emailSuccess, firebaseSuccess, googleSuccess } from '../auth/auth.actions';

@Injectable()
export class SettingsEffects {
    private actions$ = inject(Actions);
    private settingsService = inject(SettingsService);
    private store$ = inject(Store);

    loadUserSettings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(googleSuccess, emailSuccess, firebaseSuccess),
            debounceTime(100),
            map(() => {
                console.warn('Loading user settings');
                return getUserSettings();
            })
        )
    );

    // Update a single setting
    updateSetting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateSetting),
            debounceTime(500),
            withLatestFrom(this.store$.pipe(select(selectAuthenticatedAccount))),
            switchMap(([{ changes }, user]) => {
                if (!user) return of(updateSettingFailure({ error: 'User not authenticated' }));

                return this.settingsService.upsert(user.uid, changes).pipe(
                    map(() => updateSettingSuccess({ changes })),
                    catchError((error) => of(updateSettingFailure({ error })))
                );
            })
        )
    );
}
