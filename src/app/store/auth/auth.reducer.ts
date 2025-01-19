import { createFeature, createReducer, on } from '@ngrx/store';
import { emailSuccess, firebaseSuccess, googleError, googleStart, googleSuccess, logout } from './auth.actions';
import { Account } from '../accounts/account.model';

export const featureKey = 'auth';

export interface State {
  account: Account | null;
  loading: boolean;
}

export const initialState: State = {
  account: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(googleStart, (state) => ({ ...state, loading: true })),
  on(googleError, (state) => ({ ...state, loading: false })),
  on(googleSuccess, emailSuccess, firebaseSuccess, (state, payload) => ({
    ...state,
    loading: false,
    account: payload.payload,
  })),
  on(logout, () => initialState),
);

export const authFeature = createFeature({
  name: featureKey,
  reducer,
});
