import { createAction, props } from '@ngrx/store';
import { AppSetting } from './app-settings.model';

export const load = createAction('[AppSettings] Load AppSettings');
export const added = createAction('[AppSettings] Added AppSetting', props<{ payload: AppSetting }>());
export const modified = createAction('[AppSettings] Modified AppSetting', props<{ id: string; changes: Partial<AppSetting> }>());
export const removed = createAction('[AppSettings] Removed AppSetting', props<{ payload: AppSetting }>());
