import {createFeature, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {login, logout} from './core.actions';
import {User} from '../user/user.model';

export const featureKey = 'core';

export interface Core {
  isAuthenticated: boolean;
  user: User;
}

export interface State extends EntityState<Core> {
  isAuthenticated: boolean;
  user: User | null;
}

export const adapter: EntityAdapter<Core> = createEntityAdapter<Core>();

export const initialState: State = adapter.getInitialState({
  isAuthenticated: false,
  user: null,
});

export const reducer = createReducer(
  initialState,
  on(login, (state, {user}) => ({...state, isAuthenticated: true, user,})),
  on(logout, (state) => ({...state, isAuthenticated: false, user: null,}))
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
