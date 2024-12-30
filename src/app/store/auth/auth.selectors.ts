import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const selectAuthState = authFeature.selectAuthState;

export const selectAccount = createSelector(selectAuthState, (state) => state.account);
export const selectMyUid = createSelector(selectAccount, (account) => (account?.uid ? account.uid : ''));
export const isAuthenticated = createSelector(selectAuthState, (state) => state.isAuthenticated);
