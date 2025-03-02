import { createReducer, on, createFeature } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
    loadEvents,
    loadEventsSuccess,
    loadEventsFailure,
    saveTempEvent,
    clearTempEvent,
    getEventSuccess
} from './events.actions';
import { Event } from './events.model';

export const featureKey = 'events';

export const eventAdapter = createEntityAdapter<Event>({
    selectId: (event) => event.id
});

export interface State extends EntityState<Event> {
    events: Event[];
    tempEvent: Partial<Event> | null;
    loading: boolean;
    error: any;
}

export const initialState: State = eventAdapter.getInitialState({
    events: [],
    tempEvent: null,
    loading: false,
    error: null
});

const eventsReducer = createReducer(
    initialState,
    on(loadEvents, (state) => ({ ...state, loading: true })),
    on(loadEventsSuccess, (state, { payload }) => eventAdapter.upsertMany(payload, { ...state, loading: false })),
    on(loadEventsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(getEventSuccess, (state, { payload }) => eventAdapter.upsertOne(payload, state)),
    on(saveTempEvent, (state, { payload }) => ({ ...state, tempEvent: payload })),
    on(clearTempEvent, (state) => ({ ...state, tempEvent: null }))
);

export const eventsFeature = createFeature({
    name: featureKey,
    reducer: eventsReducer
});
