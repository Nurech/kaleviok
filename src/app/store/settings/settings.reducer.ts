import { createReducer, on, createFeature } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { settingAdded, settingModified, settingDeleted, updateSetting } from './settings.actions';
import { Setting } from './settings.model';

export const featureKey = 'settings';

export interface State extends EntityState<Setting> {
    loading: boolean;
    error: any;
}

export const settingsAdapter = createEntityAdapter<Setting>({
    selectId: (setting) => setting.key
});

const defaultSettings: Setting[] = [
    {
        id: '',
        uid: '',
        key: 'color_mode',
        value: true,
        description: 'dark_mode',
        icon: 'dark_mode'
    }
];

export const initialState: State = settingsAdapter.addMany(
    defaultSettings,
    settingsAdapter.getInitialState({
        loading: false,
        error: null
    })
);

const updateIfChanged = (state: any, changes: any) => {
    const currentSetting = state.entities[changes.key];
    if (currentSetting && currentSetting.value === changes.value) {
        // Return state unchanged if no actual change
    }
    return settingsAdapter.updateOne({ id: changes.key, changes }, state);
};

const settingsReducer = createReducer(
    initialState,
    on(updateSetting, (state, { changes }) => updateIfChanged(state, changes)),
    on(settingAdded, (state, { payload }) => settingsAdapter.upsertOne(payload, state)),
    on(settingModified, (state, { payload }) => settingsAdapter.upsertOne(payload, state)),
    on(settingDeleted, (state, { payload }) => settingsAdapter.removeOne(payload.key, state))
);

export const settingsFeature = createFeature({
    name: featureKey,
    reducer: settingsReducer
});
