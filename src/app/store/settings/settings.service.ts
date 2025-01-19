import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private store$ = inject(Store);

    getAll(): Observable<any> {
        return of({});
    }
}
