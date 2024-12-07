import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey, State } from './core.reducer';

export const selectCoreState = createFeatureSelector<State>(featureKey);

export const selectIsAuthenticated = createSelector(
  selectCoreState,
  (state: State) => state.isAuthenticated
);

export const selectCurrentUser = createSelector(
  selectCoreState,
  (state: State) => state.currentUser
);
