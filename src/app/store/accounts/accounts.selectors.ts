import { createSelector } from '@ngrx/store';
import { accountsFeature, adapter } from './accounts.reducer';

export const selectAccountsState = accountsFeature.selectAccountsState;

export const {
    selectIds: selectAccountIds,
    selectEntities: selectAccountEntities,
    selectAll: selectAllAccounts,
    selectTotal: selectTotalAccounts
} = adapter.getSelectors(selectAccountsState);

export const selectAccountById = (id: string) => createSelector(selectAccountEntities, (accounts) => accounts[id]);
