import { createSelector } from '@ngrx/store';
import { appSettingsFeature, adapter } from './app-settings.reducer';

export const selectAppSettingsState = appSettingsFeature.selectAppSettingsState;

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(selectAppSettingsState);

export const selectActiveAppSetting = createSelector(selectAll, (appSettings) => appSettings.find((appSetting) => appSetting.ACTIVE));

export const selectMaxFilesAllowedWhenCreateEvent = createSelector(selectActiveAppSetting, (appSetting) => appSetting?.DEFAULT_MAX_FILES_EVENT_CREATE || 10);
