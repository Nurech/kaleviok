import { createSelector } from '@ngrx/store';
import { coreFeature } from './core.reducer';
import { selectAuthState } from '../auth/auth.selectors';

export const selectCoreState = coreFeature.selectCoreState;

export const selectLoading = createSelector(selectCoreState, selectAuthState, (coreState, authState) => {
    return coreState.loading || authState.loading;
});
