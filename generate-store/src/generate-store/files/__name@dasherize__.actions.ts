import { createAction, props } from '@ngrx/store';

export const load = createAction('[<%= classify(name) %>] Load <%= classify(name) %>');
export const loadSuccess = createAction('[<%= classify(name) %>] Load <%= classify(name) %> Success', props<{ payload: <<%= classify(name) %>> }>());
export const loadFailure = createAction('[<%= classify(name) %>] Load <%= classify(name) %> Failure', props<{ error: Error }>());
