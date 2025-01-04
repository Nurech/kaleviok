import { createAction, props } from '@ngrx/store';

export const loadError = createAction('[Error] Load Error');

export const loadErrorSuccess = createAction('[Error] Load Error Success', props<{ data: any }>());

export const loadErrorFailure = createAction('[Error] Load Error Failure', props<{ error: Error }>());
