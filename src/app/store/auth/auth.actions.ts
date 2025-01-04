import { createAction, props } from '@ngrx/store';
import { Account } from '../accounts/account.model';

export const googleStart = createAction('[Auth] Google Authentication');
export const googleSuccess = createAction('[Auth] Google Authentication Success', props<{ account: Account }>());
export const googleError = createAction('[Auth] Google Authentication Error', props<{ error: Error }>());

export const emailStart = createAction('[Auth] Start Email Password', props<{ email: string; password: string }>());
export const emailSuccess = createAction('[Auth] Email Password Success', props<{ payload: Account }>());
export const emailError = createAction('[Auth] Email Password Error', props<{ error: Error }>());

export const logout = createAction('[Auth] Logout');
export const startAutoLogin = createAction('[Auth] Start Auto Login');
export const manualLogin = createAction('[Auth] Manual Login');

export const emailRegisterStart = createAction(
  '[Auth] Email Register Start',
  props<{ email: string; password: string }>(),
);
export const emailRegisterSuccess = createAction('[Auth] Email Register Success', props<{ payload: Account }>());
export const emailRegisterError = createAction('[Auth] Email Register Error', props<{ error: Error }>());
