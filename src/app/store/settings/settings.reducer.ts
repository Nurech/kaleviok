import { createReducer, on, createFeature } from '@ngrx/store';
import { getUserSettings, getUserSettingsSuccess, updateSetting } from './settings.actions';
import { Setting } from './settings.model';

export const featureKey = 'settings';

export interface State {
    settings: Setting[];
    loading: boolean;
    error: any;
}

export const initialState: State = {
    settings: [
        {
            uid: '',
            key: 'color_mode',
            value: 'auto',
            description: 'dark_mode',
            icon: 'dark_mode'
        }
    ],
    loading: false,
    error: null
};

const settingsReducer = createReducer(
    initialState,
    on(getUserSettings, (state) => ({ ...state, loading: true })),
    on(getUserSettingsSuccess, (state, { settings }) => ({ ...state, settings, loading: false })),
    on(updateSetting, (state, { changes }) => ({
        ...state,
        settings: state.settings.map((setting) => (setting.uid === changes.uid ? { ...setting, ...changes } : setting))
    }))
);

export const settingsFeature = createFeature({
    name: featureKey,
    reducer: settingsReducer
});
