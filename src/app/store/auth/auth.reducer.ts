import { createFeature, createReducer, on } from '@ngrx/store';
import { gmailError, gmailStart, gmailSuccess, logout } from './auth.actions';
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
  on(gmailStart, (state) => ({ ...state, loading: true })),
  on(gmailError, (state) => ({ ...state, loading: false })),
  on(gmailSuccess, (state, payload) => ({ ...state, loading: false, user: payload.account })),
  on(logout, () => initialState),
);

export const authFeature = createFeature({
  name: featureKey,
  reducer,
});
