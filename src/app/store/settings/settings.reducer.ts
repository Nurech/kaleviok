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
  settings: [],
  loading: false,
  error: null,
};

const settingsReducer = createReducer(
  initialState,
  on(loadSettings, (state) => ({ ...state, loading: true })),
  on(loadSettingsSuccess, (state, { data }) => ({ ...state, loading: false, settings: data })),
  on(loadSettingsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(changeMySettings, (state, { changes }) => {
    const uid = changes.uid || '';
    const existingSetting = state.settings.some((setting) => setting.uid === uid);
    const settings = existingSetting
      ? state.settings.map((setting) => (setting.uid === uid ? { ...setting, ...changes } : setting))
      : state.settings.concat({ uid, ...changes });
    return { ...state, settings };
  }),
);

export const settingsFeature = createFeature({
  name: featureKey,
  reducer: settingsReducer,
});
