import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { debounceTime, of } from 'rxjs';
import { SettingsService } from './settings.service';
import {
    getUserSettings,
    getUserSettingsSuccess,
    getUserSettingsFailure,
    updateSetting,
    settingsUpdateSuccess,
    settingsUpdateFailure,
    updateUserSettings,
    updateUserSettingsSuccess,
    updateUserSettingsFailure
} from './settings.actions';
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
            map(() => getUserSettings())
        )
    );

    // Load user settings when authenticated
    getUserSettings$ = createEffect(() =>
        this.store$.pipe(
            select(selectAuthenticatedAccount),
            switchMap((user) => {
                if (!user) return of(getUserSettingsFailure({ error: 'User not authenticated' }));

                return this.settingsService.getUserSettings().pipe(
                    switchMap((settings) => {
                        if (!settings?.uid) {
                            return of(getUserSettingsFailure({ error: 'No settings found for user' }));
                        }
                        return of(getUserSettingsSuccess({ settings }));
                    }),
                    catchError((error) => of(getUserSettingsFailure({ error })))
                );
            })
        )
    );

    // Update a single setting
    updateSetting$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateSetting),
            withLatestFrom(this.store$.pipe(select(selectAuthenticatedAccount))),
            switchMap(([{ changes }, user]) => {
                if (!user) return of(settingsUpdateFailure({ error: 'User not authenticated' }));

                return this.settingsService.updateSetting(user.uid, changes).pipe(
                    map(() => settingsUpdateSuccess({ changes })),
                    catchError((error) => of(settingsUpdateFailure({ error })))
                );
            })
        )
    );

    // Update all settings
    updateUserSettings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUserSettings),
            withLatestFrom(this.store$.pipe(select(selectAuthenticatedAccount))),
            switchMap(([{ settings }, user]) => {
                if (!user) return of(updateUserSettingsFailure({ error: 'User not authenticated' }));

                return this.settingsService.updateUserSettings(user.uid, settings).pipe(
                    map(() => updateUserSettingsSuccess({ settings })),
                    catchError((error) => of(updateUserSettingsFailure({ error })))
                );
            })
        )
    );
}
