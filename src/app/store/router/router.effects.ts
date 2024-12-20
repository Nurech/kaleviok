import {inject, Injectable} from '@angular/core';
import {Actions, ofType, createEffect} from '@ngrx/effects';
import {Router} from '@angular/router';
import {navigateTo, navigateBack, navigateForward} from './router.actions';
import {tap} from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  navigateTo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateTo),
        tap(({path, extras}) => this.router.navigate(path, extras))
      ),
    {dispatch: false}
  );

  navigateBack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateBack),
        tap(() => this.router.navigate(['../']))
      ),
    {dispatch: false}
  );

  navigateForward$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateForward),
        tap(() => window.history.forward())
      ),
    {dispatch: false}
  );
}
