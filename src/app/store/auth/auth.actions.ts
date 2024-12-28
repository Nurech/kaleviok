import { createAction, props } from '@ngrx/store';
import { User } from '../users/users.model';

export const gmailStart = createAction('[Auth] Gmail Authentication');
export const gmailError = createAction('[Auth] Gmail Authentication Error', props<{ error: Error }>());
export const gmailSuccess = createAction('[Auth] Gmail Authentication Success', props<{ user: User }>());

export const emailStart = createAction('[Auth] Start Email Password', props<{ email: string; password: string }>());
export const emailError = createAction('[Auth] Email Password Error', props<{ error: Error }>());
export const emailSuccess = createAction('[Auth] Email Password Success', props<{ payload: User }>());

export const logout = createAction('[Auth] Logout');
