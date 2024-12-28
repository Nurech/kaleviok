import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './settings.reducer';

export const selectSettingsState = createFeatureSelector<State>('settings');

export const selectData = createSelector(selectSettingsState, (state) => state.data);

export const selectLoading = createSelector(selectSettingsState, (state) => state.loading);

export const selectError = createSelector(selectSettingsState, (state) => state.error);
