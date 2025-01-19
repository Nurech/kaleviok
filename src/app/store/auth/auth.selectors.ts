import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const selectAuthState = authFeature.selectAuthState;

export const selectAuthAccount = createSelector(selectAuthState, (state) => state.account);
export const isAuthenticated = createSelector(selectAuthState, (state) => state.account !== null);
