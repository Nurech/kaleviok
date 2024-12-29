import { createReducer, on, createFeature } from '@ngrx/store';
import { loadSettings, loadSettingsSuccess, loadSettingsFailure } from './settings.actions';

export const featureKey = 'settings';

export interface State {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const settingsReducer = createReducer(
  initialState,
  on(loadSettings, (state) => ({ ...state, loading: true })),
  on(loadSettingsSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(loadSettingsFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const settingsFeature = createFeature({
  name: featureKey,
  reducer: settingsReducer,
});
