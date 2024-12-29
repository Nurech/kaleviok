import { createReducer, on, createFeature } from '@ngrx/store';
import { loadSettings, loadSettingsSuccess, loadSettingsFailure, updateSettingsSuccess } from './settings.actions';
import { Setting } from './settings.model';

export const featureKey = 'settings';

export interface State {
  settings: Setting[];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  settings: [new Setting()],
  loading: false,
  error: null,
};

const settingsReducer = createReducer(
  initialState,
  on(loadSettings, (state) => ({ ...state, loading: true })),
  on(loadSettingsSuccess, (state, { data }) => ({ ...state, loading: false, settings: data })),
  on(loadSettingsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateSettingsSuccess, (state, { changes }) => {
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
