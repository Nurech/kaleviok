import { createReducer, on, createFeature } from '@ngrx/store';
import { loadSettings, updateSettings } from './settings.actions';
import { Setting } from './settings.model';

export const featureKey = 'settings';

export interface State {
    settings: Setting;
    loading: boolean;
    error: any;
}

export const initialState: State = {
    settings: {
        autologin: false,
        colorMode: 'auto',
        loginMethod: null,
        showPwaPopup: true
    },
    loading: false,
    error: null
};

const settingsReducer = createReducer(
    initialState,
    on(loadSettings, (state) => ({ ...state, loading: true })),
    on(updateSettings, (state, { changes }) => ({ ...state, settings: { ...state.settings, ...changes } }))
);

export const settingsFeature = createFeature({
    name: featureKey,
    reducer: settingsReducer
});
