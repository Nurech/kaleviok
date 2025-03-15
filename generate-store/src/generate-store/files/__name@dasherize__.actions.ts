import { createAction, props } from '@ngrx/store';
import { <%= singular(classify(name)) %> } from './<%= dasherize(name) %>.model';

export const load = createAction('[<%= classify(name) %>] Load <%= classify(name) %>');
export const added = createAction('[<%= classify(name) %>] Added <%= singular(classify(name)) %>', props<{ payload: <%= singular(classify(name)) %> }>());
export const modified = createAction('[<%= classify(name) %>] Modified <%= singular(classify(name)) %>', props<{ id: string; changes: Partial<<%= singular(classify(name)) %>> }>());
export const removed = createAction('[<%= classify(name) %>] Removed <%= singular(classify(name)) %>', props<{ payload: <%= singular(classify(name)) %> }>());
