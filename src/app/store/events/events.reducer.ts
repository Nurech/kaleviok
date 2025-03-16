import { createReducer, on, createFeature } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
    loadEvents,
    loadEventsSuccess,
    loadEventsFailure,
    getEventSuccess,
    deleteEventSuccess,
    createEventSuccess,
    updateEventSuccess
} from './events.actions';
import { Event } from './events.model';

export const featureKey = 'events';

export const eventAdapter = createEntityAdapter<Event>({
    selectId: (event) => event.id
});

export interface State extends EntityState<Event> {
    loading: boolean;
    error: any;
}

export const initialState: State = eventAdapter.getInitialState({
    loading: false,
    error: null
});

const eventsReducer = createReducer(
    initialState,
    on(loadEvents, (state) => ({ ...state, loading: true })),
    on(loadEventsSuccess, (state, { payload }) => eventAdapter.upsertMany(payload, { ...state, loading: false })),
    on(loadEventsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(getEventSuccess, (state, { payload }) => eventAdapter.upsertOne(payload, state)),
    on(createEventSuccess, (state, { payload }) => eventAdapter.addOne(payload, state)),
    on(updateEventSuccess, (state, { payload }) => {
        if (!payload.id) {
            console.error('updateEventSuccess received a payload without an ID:', payload);
            return state; // Prevent state corruption
        }
        return eventAdapter.updateOne({ id: payload.id, changes: payload }, state);
    }),
    on(deleteEventSuccess, (state, { payload }) => eventAdapter.removeOne(payload, state))
);

export const eventsFeature = createFeature({
    name: featureKey,
    reducer: eventsReducer
});
