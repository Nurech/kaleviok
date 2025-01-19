import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
    selectCurrentRoute,
    selectFragment,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectRouteDataParam,
    selectUrl,
    selectTitle
} = getRouterSelectors(selectRouter);

export const selectEditMode = createSelector(selectQueryParams, (queryParams) => queryParams['edit'] === 'true');
export const selectAccountId = createSelector(selectQueryParams, (queryParams) => queryParams['id'] || null);
