import { createReducer, on, createFeature } from '@ngrx/store';
import { loadSettings, loadSettingsSuccess, loadSettingsFailure, changeMySettings } from './settings.actions';
import { Setting } from './settings.model';

export const featureKey = 'settings';

export interface State {
  settings: Setting[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  settings: [{ uid: '', autologin: false, theme: 'auto' }],
  loading: false,
  error: null,
};

const settingsReducer = createReducer(
  initialState,
  on(loadSettings, (state) => ({ ...state, loading: true })),
  on(loadSettingsSuccess, (state, { data }) => ({ ...state, loading: false, settings: data })),
  on(loadSettingsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(changeMySettings, (state, { changes }) => {
    const settings = state.settings.map((setting) =>
      setting.uid === changes.uid ? { ...setting, ...changes } : setting,
    );
    return { ...state, settings };
  }),
);

export const settingsFeature = createFeature({
  name: featureKey,
  reducer: settingsReducer,
});
