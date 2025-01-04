import { createFeature, createReducer, on } from '@ngrx/store';
import { googleError, googleStart, googleSuccess, logout } from './auth.actions';
import { Account } from '../accounts/account.model';

export const featureKey = 'auth';

export interface State {
  account: Account | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const initialState: State = {
  account: null,
  isAuthenticated: false,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(googleStart, (state) => ({ ...state, loading: true })),
  on(googleError, (state) => ({ ...state, loading: false })),
  on(googleSuccess, (state, payload) => ({
    ...state,
    isAuthenticated: true,
    loading: false,
    account: payload.account,
  })),
  on(logout, () => initialState),
);

export const authFeature = createFeature({
  name: featureKey,
  reducer,
});
