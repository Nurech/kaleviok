import { createAction, props } from '@ngrx/store';
import { Setting } from './settings.model';

export const loadSettings = createAction('[Settings] Load Settings');
export const updateSettings = createAction('[Settings] Change Success', props<{ changes: Partial<Setting> }>());
