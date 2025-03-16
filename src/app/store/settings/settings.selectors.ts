import { createSelector } from '@ngrx/store';
import { settingsFeature, settingsAdapter } from './settings.reducer';

const { selectAll, selectEntities, selectIds, selectTotal } = settingsAdapter.getSelectors(settingsFeature.selectSettingsState);

export const selectUserSettings = selectAll;

// Memoized selector factory
export const selectUserSettingByKey = (key: string) =>
    createSelector(selectEntities, (settings) => {
        return settings[key];
    });
export const selectSettingEntities = selectEntities;
export const selectSettingIds = selectIds;
export const selectSettingsCount = selectTotal;
