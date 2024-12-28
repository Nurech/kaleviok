// @ts-nocheck
import { createActionGroup, props } from '@ngrx/store';

export const <%= classify(name) %>Actions = createActionGroup({
  source: '<%= classify(name) %>',
  events: {
    'Load <%= classify(name) %>': props<{}>(),
    'Load <%= classify(name) %> Success': props<{ data: any }>(),
    'Load <%= classify(name) %> Failure': props<{ error: any }>(),
  },
});
