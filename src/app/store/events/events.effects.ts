import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { EventsService } from './events.service';
import { loadEvents, loadEventsSuccess, loadEventsFailure } from './events.actions';

@Injectable()
export class EventsEffects {
    private actions$ = inject(Actions);
    private eventsService = inject(EventsService);
    private store = inject(Store);

    loadEvents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEvents),
            mergeMap(() =>
                this.eventsService.getUpcoming().pipe(
                    map((events) => loadEventsSuccess({ data: events })),
                    catchError((error) => of(loadEventsFailure({ error })))
                )
            )
        )
    );
}
