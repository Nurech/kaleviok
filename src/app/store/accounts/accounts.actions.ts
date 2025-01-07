import { createAction, props } from '@ngrx/store';
import { Account } from './account.model';

export const saveAccount = createAction('[Account] Save Account', props<{ account: Account }>());
export const saveAccountSuccess = createAction('[Account] Save Account Success', props<{ payload: Account }>());
export const saveAccountFailure = createAction('[Account] Save Account Failure', props<{ error: Error }>());

export const updateAccountSuccess = createAction('[Account] Update Account Success', props<{ payload: Account }>());
export const updateAccountFailure = createAction('[Account] Update Account Failure', props<{ error: Error }>());

export const loadAccounts = createAction('[Accounts] Load Accounts');
export const loadAccountsSuccess = createAction('[Accounts] Load Accounts Success', props<{ accounts: Account[] }>());
export const loadAccountsFailure = createAction('[Accounts] Load Accounts Failure', props<{ error: any }>());
