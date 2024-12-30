import { createSelector } from '@ngrx/store';
import { settingsFeature } from './settings.reducer';
import { Setting } from './settings.model';

export const selectSettingsState = settingsFeature.selectSettingsState;
export const selectMySettings = createSelector(selectSettingsState, (state) => state.mySettings);
export const selectMySetting = <K extends keyof Setting>(key: K) =>
  createSelector(selectMySettings, (setting) => setting[key]);
