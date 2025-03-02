import { createAction, props } from '@ngrx/store';
import { Event } from './events.model';

export const loadEvents = createAction('[Events] Load Events');
export const getEventSuccess = createAction('[Events] Get Event Success', props<{ payload: Event }>());
export const loadEventsSuccess = createAction('[Events] Load Events Success', props<{ payload: Event[] }>());
export const loadEventsFailure = createAction('[Events] Load Events Failure', props<{ error: Error }>());
export const saveTempEvent = createAction('[Events] Save Temporary Event', props<{ payload: Partial<Event> }>());
export const clearTempEvent = createAction('[Events] Clear Temporary Event');

export const publishEvent = createAction('[Events] Publish Event', props<{ payload: Event }>());
export const publishEventSuccess = createAction('[Events] Publish Event Success', props<{ payload: Event }>());
export const publishEventError = createAction('[Events] Publish Event Error', props<{ error: Error }>());
