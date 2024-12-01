import {createFeature, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Account} from './account.model';
import {AccountActions} from './account.actions';

export const featureKey = 'accounts';

export interface State extends EntityState<Account> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(AccountActions.addAccount, (state, action) => adapter.addOne(action.account, state)),
  on(AccountActions.upsertAccount, (state, action) => adapter.upsertOne(action.account, state)),
  on(AccountActions.addAccounts, (state, action) => adapter.addMany(action.accounts, state)),
  on(AccountActions.upsertAccounts, (state, action) => adapter.upsertMany(action.accounts, state)),
  on(AccountActions.updateAccount, (state, action) => adapter.updateOne(action.account, state)),
  on(AccountActions.updateAccounts, (state, action) => adapter.updateMany(action.accounts, state)),
  on(AccountActions.deleteAccount, (state, action) => adapter.removeOne(action.id, state)),
  on(AccountActions.deleteAccounts, (state, action) => adapter.removeMany(action.ids, state)),
  on(AccountActions.loadAccounts, (state, action) => adapter.setAll(action.accounts, state)),
  on(AccountActions.clearAccounts, state => adapter.removeAll(state)),
);

export const accountsFeature = createFeature({
  name: featureKey,
  reducer,
  extraSelectors: ({selectAccountsState}) => ({
    ...adapter.getSelectors(selectAccountsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = accountsFeature;
