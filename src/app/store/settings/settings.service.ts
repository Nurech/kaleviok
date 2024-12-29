import { inject, Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Setting } from './settings.model';
import { selectMyUid } from '../auth/auth.selectors';
import { changeMySettings } from './settings.actions';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private store$ = inject(Store);

  getAll(): Observable<any> {
    return of({});
  }

  update(changes: Partial<Setting>) {
    this.store$
      .select(selectMyUid)
      .pipe(take(1))
      .subscribe((uid) => {
        changes.uid = uid;
        this.store$.dispatch(changeMySettings({ changes }));
      });
  }
}
