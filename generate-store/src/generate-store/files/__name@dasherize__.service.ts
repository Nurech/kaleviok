import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class <%= classify(name) %>Service {
  getAll(): Observable<any> {
    return of({});
  }
}
