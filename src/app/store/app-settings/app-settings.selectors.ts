import { createSelector } from '@ngrx/store';
import { appSettingsFeature, adapter } from './app-settings.reducer';

export const selectAppSettingsState = appSettingsFeature.selectAppSettingsState;

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors(selectAppSettingsState);

export const selectById = (id: string) => createSelector(selectEntities, (entities) => entities[id]);
export const selectLoading = createSelector(selectAppSettingsState, (state) => state.loading);
export const selectError = createSelector(selectAppSettingsState, (state) => state.error);
