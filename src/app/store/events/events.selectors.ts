import { createSelector } from '@ngrx/store';
import { eventsFeature } from './events.reducer';
import { Event } from './events.model'; // Import Event type

export const selectEventsState = eventsFeature.selectEventsState;
export const selectAllEvents = createSelector(selectEventsState, (state) => state.data);

export const selectUpcomingEvents = createSelector(selectAllEvents, (events: Event[] | null) =>
    events ? events.filter((event: Event) => new Date(event.startDate) >= new Date()) : []
);

export const selectPastEvents = createSelector(selectAllEvents, (events: Event[] | null) =>
    events ? events.filter((event: Event) => new Date(event.endDate) < new Date()) : []
);

export const selectUserCreatedEvents = (userId: string) =>
    createSelector(selectAllEvents, (events: Event[] | null) =>
        events ? events.filter((event: Event) => event.createdBy === userId) : []
    );

export const selectLoading = createSelector(selectEventsState, (state) => state.loading);
export const selectError = createSelector(selectEventsState, (state) => state.error);
export const selectTempEvent = createSelector(selectEventsState, (state) => state.tempEvent);
