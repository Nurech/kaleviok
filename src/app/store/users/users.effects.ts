import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { gmailAuthenticationSuccess } from '../core/core.actions';
import { UsersService } from './users.service';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UsersService);

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmailAuthenticationSuccess),
      tap(({ payload }) => {
        this.userService.save(payload);
      }),
    ),
  );
}
