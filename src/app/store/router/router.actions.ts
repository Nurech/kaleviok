import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const navigateTo = createAction('[Router] Navigate To', props<{ path: string[]; extras?: NavigationExtras }>());

export const navigateBack = createAction('[Router] Navigate Back');

export const navigateForward = createAction('[Router] Navigate Forward');
