import {createFeature, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {CoreActions} from './core.actions';

export const featureKey = 'core';

export interface Core {
  isAuthenticated: boolean;
  user: any;
}

export interface State extends EntityState<Core> {
  isAuthenticated: boolean;
  user: any | null;
}

export const adapter: EntityAdapter<Core> = createEntityAdapter<Core>();

export const initialState: State = adapter.getInitialState({
  isAuthenticated: false,
  user: null,
});

export const reducer = createReducer(
  initialState,
  on(CoreActions.loginSuccess, (state, {user}) => ({...state, isAuthenticated: true, user,})),
  on(CoreActions.logout, (state) => ({...state, isAuthenticated: false, user: null,}))
);

export const coreFeature = createFeature({
  name: featureKey,
  reducer,
  extraSelectors: ({selectCoreState}) => ({
    ...adapter.getSelectors(selectCoreState),
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = coreFeature;
