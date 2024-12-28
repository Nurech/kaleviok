import { createFeature, createReducer, on } from '@ngrx/store';
import { gmailError, gmailStart, gmailSuccess, logout } from './auth.actions';
import { User } from '../users/users.model';

export const featureKey = 'auth';

export interface State {
  user: User | null;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(gmailStart, (state) => ({ ...state, loading: true })),
  on(gmailError, (state) => ({ ...state, loading: false })),
  on(gmailSuccess, (state, payload) => ({ ...state, loading: false, user: payload.user })),
  on(logout, () => initialState),
);

export const authFeature = createFeature({
  name: featureKey,
  reducer,
});
