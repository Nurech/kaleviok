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

export const selectBreadcrumbs = createSelector(selectRouter, (routerState) => {
    const state = routerState?.state?.root;
    if (!state) return [];

    const segments = [];
    let currentNode = state.firstChild;
    let fullPath = '';

    while (currentNode) {
        const pathSegment = currentNode.url.map((segment) => segment.path).join('/');
        if (pathSegment) {
            fullPath += `/${pathSegment}`;
            segments.push({ label: pathSegment, url: fullPath });
        }
        currentNode = currentNode.children.length ? currentNode.children[0] : null;
    }

    if (segments.length > 5) {
        return [{ label: '...', url: '' }, ...segments.slice(-4)];
    }

    return segments;
});

// prettier-ignore-start
export const selectCurrentUrl = createSelector(selectRouter, (router) => router?.state?.url || '');
export const isAtUpcomingEvents = createSelector(selectCurrentUrl, (url) => url === '/events/upcoming');
export const isAtPastEvents = createSelector(selectCurrentUrl, (url) => url === '/events/past');
export const isAtCreatedEvents = createSelector(selectCurrentUrl, (url) => url === '/events/created');
export const isCreatingEvent = createSelector(selectCurrentUrl, (url) => url === '/events/create');
export const isAtEvent = createSelector(selectCurrentUrl, (url) => /^\/event\/[^/]+$/.test(url));
// prettier-ignore-end
