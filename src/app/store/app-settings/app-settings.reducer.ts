import { createReducer, on, createFeature } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AppSettingsActions from './app-settings.actions';
import { AppSettings } from './app-settings.model';

export const featureKey = 'AppSettings';

export const adapter: EntityAdapter<AppSettings> = createEntityAdapter<AppSettings>({
  selectId: (entity) => entity.id
});

export interface State extends EntityState<AppSettings> {
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
    on(AppSettingsActions.loadSuccess, (state, { payload }) => adapter.setAll(payload, { ...state, loading: false })),
    on(AppSettingsActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const appSettingsFeature = createFeature({
  name: featureKey,
  reducer: appSettingsReducer
});
