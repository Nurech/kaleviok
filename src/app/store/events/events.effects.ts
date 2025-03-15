import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { EventsService } from './events.service';
import {
    loadEvents,
    loadEventsSuccess,
    loadEventsFailure,
    deleteEvent,
    deleteEventSuccess,
    deleteEventError,
    editEvent,
    createEvent,
    createEventSuccess,
    createEventError,
    updateEvent,
    updateEventSuccess,
    updateEventError,
    saveEvent,
    saveEventSuccess,
    saveEventError
} from './events.actions';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { navigateBack } from '../router/router.actions';
import { EventStatus } from './events.model';

@Injectable()
export class EventsEffects {
    private actions$ = inject(Actions);
    private eventsService = inject(EventsService);
    private store$ = inject(Store);
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

    deleteEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEvent),
            mergeMap(({ payload }) =>
                this.eventsService.delete(payload).pipe(
                    map(() => {
                        this.store$.dispatch(navigateBack());
                        return deleteEventSuccess({ payload });
                    }),
                    catchError((error) => of(deleteEventError({ error })))
                )
            )
        )
    );

    editEvent$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(editEvent),
                tap(({ payload }) => this.router.navigate([`events/edit/${payload}`]))
            ),
        { dispatch: false }
    );

    createEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createEvent),
            mergeMap(({ payload }) =>
                this.store$.pipe(
                    select(selectAuthenticatedAccount),
                    mergeMap((account) => {
                        const updatedEvent = {
                            ...payload,
                            createdBy: account?.uid,
                            createdAt: new Date().toISOString()
                        };

                        return this.eventsService.upsert(updatedEvent).pipe(
                            map((createdEvent) => {
                                this.router.navigate([`events/create/${createdEvent.id}`]);
                                return createEventSuccess({ payload: createdEvent });
                            }),
                            catchError((error) => of(createEventError({ error })))
                        );
                    })
                )
            )
        )
    );

    saveEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveEvent),
            mergeMap(({ payload }) =>
                this.store$.pipe(
                    select(selectAuthenticatedAccount),
                    mergeMap((account) => {
                        const event = {
                            ...payload,
                            status: payload.status ?? EventStatus.DRAFT,
                            startDate: payload.startDate ? new Date(payload.startDate).toISOString() : payload.startDate,
                            startTime: payload.startTime ? new Date(payload.startTime).toISOString() : payload.startTime,
                            endDate: payload.endDate ? new Date(payload.endDate).toISOString() : payload.endDate,
                            endTime: payload.endTime ? new Date(payload.endTime).toISOString() : payload.endTime,
                            createdBy: payload.id ? payload.createdBy : account?.uid || '', // Preserve createdBy if editing
                            modifiedBy: payload.id ? account?.uid || '' : payload.modifiedBy // Add modifiedBy only if updating
                        };

                        return this.eventsService.upsert(event).pipe(
                            map((createdEvent) => {
                                this.store$.dispatch(navigateBack());
                                return saveEventSuccess({ payload: createdEvent });
                            }),
                            catchError((error) => of(saveEventError({ error })))
                        );
                    })
                )
            )
        )
    );

    updateEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEvent),
            mergeMap(({ payload }) =>
                this.eventsService.upsert(payload).pipe(
                    map((updatedEvent) => {
                        return updateEventSuccess({ payload: updatedEvent });
                    }),
                    catchError((error) => of(updateEventError({ error })))
                )
            )
        )
    );
}
