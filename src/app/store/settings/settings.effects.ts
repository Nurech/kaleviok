import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  updateSettings,
  updateSettingsSuccess,
} from './settings.actions';
import { SettingsService } from './settings.service';
import { selectMyUid } from '../auth/auth.selectors';

@Injectable()
export class SettingsEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store);
  private settingsService = inject(SettingsService);

  updateMySettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSettings),
      withLatestFrom(this.store$.select(selectMyUid)),
      map(([{ changes }, uid]) => {
        const updatedChanges = { ...changes, uid };
        return updateSettingsSuccess({ changes: updatedChanges });
      }),
    ),
  );
}
