import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  getAll(): Observable<any> {
    return of({});
  }
}
