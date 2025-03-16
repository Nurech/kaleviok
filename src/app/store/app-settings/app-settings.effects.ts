import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { map } from 'rxjs';
import { AppSettingsService } from './app-settings.service';
import { startListener, stopListener } from './app-settings.actions';

@Injectable()
export class AppSettingsEffects implements OnInitEffects {
    actions$ = inject(Actions);
    service = inject(AppSettingsService);

    ngrxOnInitEffects() {
        return startListener();
    }

    startListener$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(startListener),
                map(() => this.service.startListen())
            ),
        { dispatch: false }
    );

    stopListener$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(stopListener),
                map(() => this.service.stopListen())
            ),
        { dispatch: false }
    );
}
