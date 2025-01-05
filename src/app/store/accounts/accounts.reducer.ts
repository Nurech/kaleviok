import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { saveAccountSuccess, updateAccountSuccess } from './accounts.actions';
import { Account } from './account.model';

export const featureKey = 'accounts';

export interface State extends EntityState<Account> {
  selectedUserId: string | null;
}

export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>({
  selectId: (account) => account.uid,
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
});

export const reducer = createReducer(
  initialState,
  on(saveAccountSuccess, updateAccountSuccess, (state, action) => adapter.upsertOne(action.payload, state)),
);

export const accountsFeature = createFeature({
  name: featureKey,
  reducer,
  extraSelectors: ({ selectAccountsState }) => ({
    ...adapter.getSelectors(selectAccountsState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } = accountsFeature;
