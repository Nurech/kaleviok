import { createReducer, on, createFeature } from '@ngrx/store';
import { loadEvents, loadEventsSuccess, loadEventsFailure, saveTempEvent, clearTempEvent } from './events.actions';
import { Event } from './events.model';

export const featureKey = 'events';

export interface State {
    data: Event[] | null;
    tempEvent: Partial<Event> | null;
    loading: boolean;
    error: any;
}

export const initialState: State = {
    data: null,
    tempEvent: null,
    loading: false,
    error: null
};

const eventsReducer = createReducer(
    initialState,
    on(loadEvents, (state) => ({ ...state, loading: true })),
    on(loadEventsSuccess, (state, { data }) => ({ ...state, loading: false, data })),
    on(loadEventsFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(saveTempEvent, (state, { event }) => ({ ...state, tempEvent: event })),
    on(clearTempEvent, (state) => ({ ...state, tempEvent: null }))
);

export const eventsFeature = createFeature({
    name: featureKey,
    reducer: eventsReducer
});
