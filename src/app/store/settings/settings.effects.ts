import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadSettings, loadSettingsSuccess, loadSettingsFailure } from './settings.actions';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsEffects {
  private actions$ = inject(Actions);
  private settingsService = inject(SettingsService);

  loadSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSettings),
      mergeMap(() =>
        this.settingsService.getAll().pipe(
          map((data) => loadSettingsSuccess({ data })),
          catchError((error) => of(loadSettingsFailure({ error }))),
        ),
      ),
    ),
  );
}
