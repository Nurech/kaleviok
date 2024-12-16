import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, State} from './snackBar.reducer';

export const selectSnackbarState = createFeatureSelector<State>(featureKey);

export const selectIsAuthenticated = createSelector(
  selectSnackbarState,
  (state: State) => state.isAuthenticated
);

export const selectCurrentUser = createSelector(
  selectSnackbarState,
  (state: State) => state.currentUser
);
