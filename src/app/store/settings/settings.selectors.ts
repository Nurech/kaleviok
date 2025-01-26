import { createSelector } from '@ngrx/store';
import { settingsFeature } from './settings.reducer';

export const selectSettingsState = settingsFeature.selectSettingsState;
export const selectUserSettings = createSelector(selectSettingsState, (state) => state.settings.userSettings);
export const selectUserSettingByKey = (key: string) =>
    createSelector(selectUserSettings, (settings) => settings.find((setting) => setting.key === key));
