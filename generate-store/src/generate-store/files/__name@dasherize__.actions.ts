import { createAction, props } from '@ngrx/store';

export const load<%= classify(name) %> = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %>'
);

export const load<%= classify(name) %>Success = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %> Success',
  props<{ data: any }>()
);

export const load<%= classify(name) %>Failure = createAction(
  '[<%= classify(name) %>] Load <%= classify(name) %> Failure',
  props<{ error: any }>()
);
