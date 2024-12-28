import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { UsersService } from './users.service';
import { gmailSuccess } from '../auth/auth.actions';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UsersService);

  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gmailSuccess),
      tap((payload) => {
        this.userService.save(payload.user);
      }),
    ),
  );
}
