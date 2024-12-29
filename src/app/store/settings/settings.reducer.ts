import { createReducer, on } from '@ngrx/store';
import { loadSettings, loadSettingsSuccess, loadSettingsFailure } from './settings.actions';
import { Setting } from './settings.model';

export const featureKey = 'settings';

export interface State {
  setting: Setting | null;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  setting: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(loadSettings, (state) => ({ ...state, loading: true })),
  on(loadSettingsSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(loadSettingsFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
