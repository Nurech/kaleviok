import { createAction, props } from '@ngrx/store';

export const navigateTo = createAction(
  '[Router] Navigate To',
  props<{ path: string[]; queryParams?: Record<string, any> }>()
);

export const navigateBack = createAction('[Router] Navigate Back');

export const navigateForward = createAction('[Router] Navigate Forward');
