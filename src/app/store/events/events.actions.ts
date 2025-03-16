import { createAction, props } from '@ngrx/store';
import { Event } from './events.model';

export const getEventSuccess = createAction('[Events] Get Event Success', props<{ payload: Event }>());

export const loadEvents = createAction('[Events] Load Events');
export const loadEventsSuccess = createAction('[Events] Load Events Success', props<{ payload: Event[] }>());
export const loadEventsFailure = createAction('[Events] Load Events Failure', props<{ error: Error }>());

export const deleteEvent = createAction('[Events] Delete Event', props<{ payload: string }>());
export const deleteEventSuccess = createAction('[Events] Delete Event Success', props<{ payload: string }>());
export const deleteEventError = createAction('[Events] Delete Event Error', props<{ error: Error }>());

export const createEvent = createAction('[Events] Create Event', props<{ payload?: Event }>());
export const createEventSuccess = createAction('[Events] Create Event Success', props<{ payload: Event }>());
export const createEventError = createAction('[Events] Create Event Error', props<{ error: Error }>());

export const updateEvent = createAction('[Events] Update Event', props<{ payload: Partial<Event> }>());
export const updateEventSuccess = createAction('[Events] Update Event Success', props<{ payload: Partial<Event> }>());
export const updateEventError = createAction('[Events] Update Event Error', props<{ error: Error }>());

export const saveEvent = createAction('[Events] Save Event', props<{ payload: Event }>());
export const saveEventSuccess = createAction('[Events] Save Event Success', props<{ payload: Event }>());
export const saveEventError = createAction('[Events] Save Event Error', props<{ error: Error }>());

export const editEvent = createAction('[Events] Edit Event', props<{ payload: string }>());
