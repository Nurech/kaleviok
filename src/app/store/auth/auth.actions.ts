import { createAction, props } from '@ngrx/store';
import { Account } from '../accounts/account.model';
import { LoginMethod } from '../settings/settings.model';

export const googleStart = createAction('[Auth] Google Authentication');
export const googleSuccess = createAction('[Auth] Google Authentication Success', props<{ account: Account }>());
export const googleError = createAction('[Auth] Google Authentication Error', props<{ error: Error }>());

export const emailStart = createAction('[Auth] Start Email Password', props<{ email: string; password: string }>());
export const emailSuccess = createAction('[Auth] Email Password Success', props<{ payload: Account }>());
export const emailError = createAction('[Auth] Email Password Error', props<{ error: Error }>());

export const logout = createAction('[Auth] Logout');
export const autologin = createAction('[Auth] Autologin', props<{ payload: LoginMethod }>());

export const getCurrentAccountSuccess = createAction(
  '[Auth] Get Current Account Success',
  props<{ account: Account }>(),
);
