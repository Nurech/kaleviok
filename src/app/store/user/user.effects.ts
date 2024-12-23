import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions) {}
}
