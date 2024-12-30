import { createAction, props } from '@ngrx/store';
import { Setting } from './settings.model';

export const loadSettings = createAction('[Settings] Load Settings');
export const loadSettingsSuccess = createAction('[Settings] Load Settings Success', props<{ data: any }>());
export const loadSettingsFailure = createAction('[Settings] Load Settings Failure', props<{ error: any }>());
export const updateMySettings = createAction('[Settings] Change Settings', props<{ changes: Partial<Setting> }>());
export const updateMySettingsSuccess = createAction(
  '[Settings] Change Success',
  props<{ changes: Partial<Setting> }>(),
);
export const updateSettingsFailure = createAction('[Settings] Change Failure', props<{ error: Error }>());
