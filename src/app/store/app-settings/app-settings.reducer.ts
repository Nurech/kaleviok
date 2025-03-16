import { createReducer, on, createFeature } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AppSettingsActions from './app-settings.actions';
import { AppSetting } from './app-settings.model';

export const featureKey = 'appSettings';

export const adapter: EntityAdapter<AppSetting> = createEntityAdapter<AppSetting>({
    selectId: (entity) => entity.id
});

export interface State extends EntityState<AppSetting> {
    loading: boolean;
    error: any;
}

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null
});

const appSettingsReducer = createReducer(
    initialState,
    on(AppSettingsActions.load, (state) => ({ ...state, loading: true })),
    on(AppSettingsActions.modified, (state, { id, changes }) => adapter.updateOne({ id, changes }, state)),
    on(AppSettingsActions.added, (state, { payload }) => adapter.addOne(payload, state)),
    on(AppSettingsActions.removed, (state, { payload }) => adapter.removeOne(payload.id, state))
);

export const appSettingsFeature = createFeature({
    name: featureKey,
    reducer: appSettingsReducer
});
