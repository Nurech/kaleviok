import { createAction, props } from '@ngrx/store';
import { Setting } from './settings.model';

// new
export const settingAdded = createAction('[Settings] Added', props<{ payload: Setting }>());
export const settingModified = createAction('[Settings] Modified', props<{ payload: Setting }>());
export const settingDeleted = createAction('[Settings] Deleted', props<{ payload: Setting }>());
export const updateSetting = createAction('[Settings] Update', props<{ changes: Setting }>());
