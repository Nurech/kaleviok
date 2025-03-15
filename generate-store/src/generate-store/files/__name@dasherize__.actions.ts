import { createAction, props } from '@ngrx/store';
import { <%= singular(classify(name)) %> } from './<%= dasherize(name) %>.model';

export const load = createAction('[<%= classify(name) %>] Load <%= classify(name) %>');
export const loadSuccess = createAction('[<%= classify(name) %>] Load <%= classify(name) %> Success', props<{ payload: <%= singular(classify(name)) %> }>());
export const loadFailure = createAction('[<%= classify(name) %>] Load <%= classify(name) %> Failure', props<{ error: Error }>());
