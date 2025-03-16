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
export const selectAccountId = createSelector(selectQueryParams, (queryParams) => queryParams['accountId'] || null);

// prettier-ignore-start
export const selectCurrentUrl = createSelector(selectRouter, (router) => router?.state?.url || '');
export const isAtRoot = createSelector(selectCurrentUrl, (url) => url === '/');
export const isAtUpcomingEvents = createSelector(selectCurrentUrl, (url) => url === '/events/upcoming');
export const isAtPastEvents = createSelector(selectCurrentUrl, (url) => url === '/events/past');
export const isAtCreatedEvents = createSelector(selectCurrentUrl, (url) => url === '/events/created');
export const isCreatingEvent = createSelector(selectCurrentUrl, (url) => url === '/events/create');
export const isAtEvent = createSelector(selectCurrentUrl, (url) => /^\/event\/[^/]+$/.test(url));
export const selectCurrentEventId = createSelector(selectRouteParams, (params) => params['id'] || null);
// prettier-ignore-end
