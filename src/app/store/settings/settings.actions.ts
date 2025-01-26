import { createAction, props } from '@ngrx/store';
import { Setting } from './settings.model';

// Load all user settings
export const getUserSettings = createAction('[Settings] Load Settings');
export const getUserSettingsSuccess = createAction('[Settings] Load Success', props<{ settings: Setting[] }>());
export const getUserSettingsFailure = createAction('[Settings] Load Failure', props<{ error: any }>());

// Update a single setting
export const updateSetting = createAction('[Setting] Update', props<{ changes: Setting }>());
export const updateSettingSuccess = createAction('[Settings] Update Success', props<{ changes: Setting }>());
export const updateSettingFailure = createAction('[Settings] Update Failure', props<{ error: any }>());
