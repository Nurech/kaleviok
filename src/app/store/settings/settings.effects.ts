import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { updateMySettings, updateMySettingsSuccess } from './settings.actions';
import { selectMyUid } from '../auth/auth.selectors';
import { selectMySettings } from './settings.selectors';

@Injectable()
export class SettingsEffects {
  private actions$ = inject(Actions);
  private store$ = inject(Store);

  updateMySettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMySettings),
      withLatestFrom(this.store$.select(selectMyUid), this.store$.select(selectMySettings)),
      map(([{ changes }, uid, existingSettings]) => {
        const updatedChanges = { ...existingSettings, ...changes };
        updatedChanges.uid = uid;
        return updateMySettingsSuccess({ changes: updatedChanges });
      }),
    ),
  );
}
