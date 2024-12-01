import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const CoreActions = createActionGroup({
  source: 'Core/API',
  events: {
    'Start Gmail Authentication': emptyProps(),
    'Gmail Authentication Error': props<{ error: Error }>(),
    'Login Success':  props<{ user: any }>(),
    'Logout': emptyProps(),
  }
});
