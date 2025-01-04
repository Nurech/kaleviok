import { createSelector } from '@ngrx/store';
import { errorFeature } from './error.reducer';

export const selectErrorState = errorFeature.selectErrorState;

export const selectData = createSelector(selectErrorState, (state) => state.data);

export const selectLoading = createSelector(selectErrorState, (state) => state.loading);

export const selectError = createSelector(selectErrorState, (state) => state.error);
