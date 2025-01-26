import { createAction, props } from '@ngrx/store';
import { Setting, Settings } from './settings.model';

// Load all user settings
export const getUserSettings = createAction('[Settings] Load Settings');
export const getUserSettingsSuccess = createAction('[Settings] Load Success', props<{ settings: Settings }>());
export const getUserSettingsFailure = createAction('[Settings] Load Failure', props<{ error: any }>());

// Update a single setting
export const updateSetting = createAction('[Setting] Update', props<{ changes: Setting }>());
export const settingsUpdateSuccess = createAction('[Settings] Update Success', props<{ changes: Setting }>());
export const settingsUpdateFailure = createAction('[Settings] Update Failure', props<{ error: any }>());

// Update all user settings
export const updateUserSettings = createAction('[Settings] Update All', props<{ settings: Settings }>());
export const updateUserSettingsSuccess = createAction('[Settings] Update All Success', props<{ settings: Settings }>());
export const updateUserSettingsFailure = createAction('[Settings] Update All Failure', props<{ error: any }>());
