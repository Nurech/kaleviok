import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Account } from './account.reducer';

export const AccountActions = createActionGroup({
  source: 'Account/API',
  events: {
    'Load Accounts': props<{ accounts: Account[] }>(),
    'Load Accounts Error': props<{ error: Error }>(),
    'Add Account': props<{ account: Account }>(),
    'Upsert Account': props<{ account: Account }>(),
    'Add Accounts': props<{ accounts: Account[] }>(),
    'Upsert Accounts': props<{ accounts: Account[] }>(),
    'Update Account': props<{ account: Update<Account> }>(),
    'Update Accounts': props<{ accounts: Update<Account>[] }>(),
    'Delete Account': props<{ id: string }>(),
    'Delete Accounts': props<{ ids: string[] }>(),
    'Clear Accounts': emptyProps(),
  },
});
