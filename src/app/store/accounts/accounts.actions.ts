import { createAction, props } from '@ngrx/store';
import { Account } from './account.model';

export const saveAccount = createAction('[Account] Save Account', props<{ account: Account }>());
export const saveAccountSuccess = createAction('[Account] Save Account Success', props<{ account: Account }>());
export const saveAccountFailure = createAction('[Account] Save Account Failure', props<{ error: Error }>());

export const updateAccountSuccess = createAction('[Account] Update Account Success', props<{ account: Account }>());
export const updateAccountFailure = createAction('[Account] Update Account Failure', props<{ error: Error }>());
