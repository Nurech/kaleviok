import { createSelector } from '@ngrx/store';
import { settingsFeature } from './settings.reducer';

export const selectSettingsState = settingsFeature.selectSettingsState;
export const selectSettings = createSelector(selectSettingsState, (state) => state.settings);
