import { createReducer, on, createFeature } from '@ngrx/store';
import { loadSettings, loadSettingsSuccess, loadSettingsFailure, updateMySettingsSuccess } from './settings.actions';
import { Setting } from './settings.model';

export const featureKey = 'settings';

export interface State {
  settings: Setting[];
  mySettings: Setting;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  settings: [],
  mySettings: new Setting(),
  loading: false,
  error: null,
};

const settingsReducer = createReducer(
  initialState,
  on(loadSettings, (state) => ({ ...state, loading: true })),
  on(loadSettingsSuccess, (state, { data }) => ({ ...state, loading: false, settings: data })),
  on(loadSettingsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateMySettingsSuccess, (state, { changes }) => ({
    ...state,
    mySettings: {
      ...state.mySettings,
      ...changes,
    },
  })),
);

export const settingsFeature = createFeature({
  name: featureKey,
  reducer: settingsReducer,
});
