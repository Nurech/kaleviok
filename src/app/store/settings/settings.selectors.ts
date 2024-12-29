import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './settings.reducer';
import { selectMyUid } from '../auth/auth.selectors';

export const selectSettingsState = createFeatureSelector<State>('settings');

export const selectLoading = createSelector(selectSettingsState, (state) => state.loading);

export const selectError = createSelector(selectSettingsState, (state) => state.error);

export const selectMySettings = createSelector(selectSettingsState, selectMyUid, (state, myUid) => {
  const mySetting = state.settings.find((setting) => setting.uid === myUid);
  return mySetting || { uid: myUid, autologin: false };
});
