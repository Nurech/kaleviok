import { createSelector } from '@ngrx/store';
import { authFeature } from './auth.reducer';

export const selectAuthState = authFeature.selectAuthState;

export const selectUser = createSelector(selectAuthState, (state) => state.user);
export const selectLoading = createSelector(selectAuthState, (state) => state.loading);
export const selectMyUid = createSelector(selectUser, (user) => (user?.uid ? user.uid : ''));
