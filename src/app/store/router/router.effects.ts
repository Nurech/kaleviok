import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { navigateTo, navigateBack, navigateForward } from './router.actions';

@Injectable()
export class RouterEffects {
    private actions$ = inject(Actions);
    private store$ = inject(Store);
    private router = inject(Router);

    navigateTo$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(navigateTo),
                tap(({ path }) => this.router.navigate([path]))
            ),
        { dispatch: false }
    );

    navigateBack$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(navigateBack),
                tap(() => {
                    if (window.history.length > 1) {
                        // If there is a browser history, use it
                        window.history.back();
                    } else {
                        // If no browser history, fallback to Angular router
                        this.router.navigate(['/']); // Default to root if no history
                    }
                })
            ),
        { dispatch: false }
    );

    navigateForward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(navigateForward),
                tap(() => window.history.forward())
            ),
        { dispatch: false }
    );
}
