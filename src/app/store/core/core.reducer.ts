import {createFeature, createReducer, on} from '@ngrx/store';
import {loginSuccess, logout} from './core.actions';
import {User} from '../user/user.model';

export const featureKey = 'core';

export interface State {
  isAuthenticated: boolean;
  currentUser: User | null;
}

export const initialState: State = {
  isAuthenticated: false,
  currentUser: null,
};

export const reducer = createReducer(
  initialState,
  on(loginSuccess, (state, {payload}) => ({...state, isAuthenticated: true, currentUser: payload})),
  on(logout, (state) => ({...state, isAuthenticated: false, currentUser: null,}))
);

export const coreFeature = createFeature({
  name: featureKey,
  reducer,
});
