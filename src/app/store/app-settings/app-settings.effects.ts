import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as AppSettingsActions from './app-settings.actions';
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class AppSettingsEffects {
    constructor(private actions$: Actions, private service: AppSettingsService) {}

    loadAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppSettingsActions.load),
            mergeMap(() =>
                this.service.getAll().pipe(
                    map((data) => AppSettingsActions.loadSuccess({ payload: data })),
                    catchError((error) => of(AppSettingsActions.loadFailure({ error })))
                )
            )
        )
    );
}
