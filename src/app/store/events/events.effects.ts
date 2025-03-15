import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { EventsService } from './events.service';
import {
    loadEvents,
    loadEventsSuccess,
    loadEventsFailure,
    sendToReview,
    sendToReviewSuccess,
    sendToReviewError,
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

    sendToReview$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendToReview),
            withLatestFrom(this.store$.select(selectAuthenticatedAccount)), // Get authenticated account
            mergeMap(([{ payload: saveEvent }, account]) => {
                const event = {
                    ...saveEvent,
                    publishedAt: new Date().toISOString(),
                    status: EventStatus.REVIEW,
                    startDate: saveEvent.startDate ? new Date(saveEvent.startDate).toISOString() : saveEvent.startDate,
                    startTime: saveEvent.startTime ? new Date(saveEvent.startTime).toISOString() : saveEvent.startTime,
                    endDate: saveEvent.endDate ? new Date(saveEvent.endDate).toISOString() : saveEvent.endDate,
                    endTime: saveEvent.endTime ? new Date(saveEvent.endTime).toISOString() : saveEvent.endTime,
                    createdBy: saveEvent.id ? saveEvent.createdBy : account?.uid || '', // Preserve createdBy if editing
                    modifiedBy: saveEvent.id ? account?.uid || '' : saveEvent.modifiedBy // Add modifiedBy only if updating
                };
                console.warn('Publishing event:', event);

                // If createdAt is not set, set it to the current date
                if (!event.createdAt) {
                    event.createdAt = new Date().toISOString();
                }

                // If this is a modification, set modifiedAt to the current date
                if (saveEvent.id) {
                    event.modifiedAt = new Date().toISOString();
                } else {
                    delete event.modifiedAt;
                    delete event.modifiedBy;
                }

                return this.eventsService.upsert(event).pipe(
                    map(() => {
                        this.router.navigate([`/events/${event.id}`]);
                        return sendToReviewSuccess({ payload: event });
                    }),
                    catchError((error) => of(sendToReviewError({ error })))
                );
            })
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
                        const updatedEvent = {
                            ...payload,
                            createdBy: account?.uid,
                            createdAt: new Date().toISOString(),
                            status: EventStatus.DRAFT
                        };

                        return this.eventsService.upsert(updatedEvent).pipe(
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
