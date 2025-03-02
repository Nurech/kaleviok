import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { EventsService } from './events.service';
import {
    loadEvents,
    loadEventsSuccess,
    loadEventsFailure,
    publishEvent,
    publishEventSuccess,
    publishEventError
} from './events.actions';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';

@Injectable()
export class EventsEffects {
    private actions$ = inject(Actions);
    private eventsService = inject(EventsService);
    private store = inject(Store);
    private router = inject(Router);

    loadEvents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEvents),
            mergeMap(() =>
                this.eventsService.getUpcoming().pipe(
                    map((events) => loadEventsSuccess({ payload: events })),
                    catchError((error) => of(loadEventsFailure({ error })))
                )
            )
        )
    );

    publishEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(publishEvent),
            withLatestFrom(this.store.select(selectAuthenticatedAccount)), // Get authenticated account
            mergeMap(([{ payload: saveEvent }, account]) => {
                const event = {
                    ...saveEvent,
                    createdBy: saveEvent.id ? saveEvent.createdBy : account?.uid || '', // Preserve createdBy if editing
                    modifiedBy: saveEvent.id ? account?.uid || '' : saveEvent.modifiedBy // Add modifiedBy only if updating
                };

                // If createdAt is not set, set it to the current date
                if (!event.createdAt) {
                    event.createdAt = new Date();
                }

                // If this is a modification, set modifiedAt to the current date
                if (saveEvent.id) {
                    event.modifiedAt = new Date();
                } else {
                    delete event.modifiedAt;
                    delete event.modifiedBy;
                }

                return this.eventsService.upsert(event).pipe(
                    map(() => {
                        this.router.navigate([`/event/${event.id}`]);
                        return publishEventSuccess({ payload: event });
                    }),
                    catchError((error) => of(publishEventError({ error })))
                );
            })
        )
    );
}
