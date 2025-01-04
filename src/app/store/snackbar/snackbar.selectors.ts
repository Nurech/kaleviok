import { createSelector } from '@ngrx/store';
import { snackbarFeature } from './snackbar.reducer';

export const selectSnackbarState = snackbarFeature.selectSnackbarState;

export const selectData = createSelector(selectSnackbarState, (state) => state.data);

export const selectLoading = createSelector(selectSnackbarState, (state) => state.loading);

export const selectError = createSelector(selectSnackbarState, (state) => state.error);
