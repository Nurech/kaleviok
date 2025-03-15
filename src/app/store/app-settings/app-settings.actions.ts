import { createAction, props } from '@ngrx/store';
import { AppSetting } from './app-settings.model';

export const load = createAction('[AppSettings] Load AppSettings');
export const loadSuccess = createAction('[AppSettings] Load AppSettings Success', props<{ payload: AppSetting }>());
export const loadFailure = createAction('[AppSettings] Load AppSettings Failure', props<{ error: Error }>());
