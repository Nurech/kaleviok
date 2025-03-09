import { createAction, props } from '@ngrx/store';
import { IEvent } from './events.model';

export const loadEvents = createAction('[Events] Load Events');
export const getEventSuccess = createAction('[Events] Get Event Success', props<{ payload: IEvent }>());
export const loadEventsSuccess = createAction('[Events] Load Events Success', props<{ payload: IEvent[] }>());
export const loadEventsFailure = createAction('[Events] Load Events Failure', props<{ error: Error }>());
export const saveTempEvent = createAction('[Events] Save Temporary Event', props<{ payload: Partial<IEvent> }>());
export const clearTempEvent = createAction('[Events] Clear Temporary Event');

export const publishEvent = createAction('[Events] Publish Event', props<{ payload: IEvent }>());
export const publishEventSuccess = createAction('[Events] Publish Event Success', props<{ payload: IEvent }>());
export const publishEventError = createAction('[Events] Publish Event Error', props<{ error: Error }>());

export const deleteEvent = createAction('[Events] Delete Event', props<{ payload: string }>());
export const deleteEventSuccess = createAction('[Events] Delete Event Success', props<{ payload: string }>());
export const deleteEventError = createAction('[Events] Delete Event Error', props<{ error: Error }>());
