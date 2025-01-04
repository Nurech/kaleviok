import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { emailRegisterError } from '../auth/auth.actions';

@Injectable()
export class ErrorEffects {
  private actions$ = inject(Actions);
  private errorService = inject(ErrorService);

  interceptError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(emailRegisterError),
        tap((action) => {
          this.errorService.handleError(action.error);
        }),
      ),
    { dispatch: false },
  );
}
