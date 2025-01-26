import { createReducer, on, createFeature } from '@ngrx/store';
import { getUserSettings, getUserSettingsSuccess, updateSetting } from './settings.actions';
import { Settings } from './settings.model';

export const featureKey = 'settings';

export interface State {
    settings: Settings;
    loading: boolean;
    error: any;
}

export const initialState: State = {
    settings: {
        uid: '',
        userSettings: [
            {
                key: 'color_mode',
                value: 'auto',
                description: 'dark_mode',
                icon: 'dark_mode'
            }
        ]
    },
    loading: false,
    error: null
};

const settingsReducer = createReducer(
    initialState,
    on(getUserSettings, (state) => ({ ...state, loading: true })),
    on(getUserSettingsSuccess, (state, { settings }) => ({ ...state, settings, loading: false })),
    on(updateSetting, (state, { changes }) => ({
        ...state,
        settings: {
            ...state.settings,
            settings: state.settings.userSettings.map((setting) =>
                setting.key === changes.key ? { ...setting, ...changes } : setting
            )
        }
    }))
);

export const settingsFeature = createFeature({
    name: featureKey,
    reducer: settingsReducer
});
