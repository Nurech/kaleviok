import { createAction, props } from '@ngrx/store';
import { Event } from './events.model';

export const loadEvents = createAction('[Events] Load Events');

export const loadEventsSuccess = createAction('[Events] Load Events Success', props<{ data: Event[] }>());

export const loadEventsFailure = createAction('[Events] Load Events Failure', props<{ error: Error }>());

// Save temporary event form data
export const saveTempEvent = createAction('[Events] Save Temporary Event', props<{ event: Partial<Event> }>());

// Clear temporary event data
export const clearTempEvent = createAction('[Events] Clear Temporary Event');
