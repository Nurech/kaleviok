import { createSelector } from '@ngrx/store';
import { eventsFeature, eventAdapter } from './events.reducer';
import { selectCurrentEventId } from '../router/router.selectors';
import { selectAllAccounts } from '../accounts/accounts.selectors';

export const selectEventsState = eventsFeature.selectEventsState;
export const { selectAll: selectAllEvents, selectEntities: selectEventEntities } =
    eventAdapter.getSelectors(selectEventsState);
export const selectAllEventIds = createSelector(selectAllEvents, (events) => events.map((event) => event.id));
export const selectEventById = (eventId: string) =>
    createSelector(selectEventEntities, (entities) => (entities ? (entities[eventId] ?? null) : null));

export const selectUpcomingEvents = createSelector(selectAllEvents, (events) =>
    events.filter((event) => new Date(event?.startDate || 0) >= new Date())
);
export const selectPastEvents = createSelector(selectAllEvents, (events) =>
    events.filter((event) => new Date(event?.endDate || 0) < new Date())
);
export const selectUserCreatedEvents = (userId: string) =>
    createSelector(selectAllEvents, (events) => events.filter((event) => event.createdBy === userId));
export const selectLoading = createSelector(selectEventsState, (state) => state.loading);
export const selectError = createSelector(selectEventsState, (state) => state.error);
export const selectTempEvent = createSelector(selectEventsState, (state) => state.tempEvent);

export const selectCurrentEventVM = createSelector(
    selectCurrentEventId,
    selectEventEntities,
    selectAllAccounts,
    (eventId, entities, accounts) => {
        const event = entities[eventId];
        if (!event) {
            return null;
        }
        return {
            event,
            createdBy: accounts.find((account) => account.uid === event.createdBy) || null
        };
    }
);
