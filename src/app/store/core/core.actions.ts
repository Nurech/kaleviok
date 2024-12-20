import {createAction, props} from '@ngrx/store';
import {User} from '../user/user.model';

export const startGmailAuthentication = createAction('[Core] Start Gmail');
export const startGmailAuthenticationError = createAction('[Core] Gmail Error', props<{ error: Error }>());
export const startGmailAuthenticationSuccess = createAction('[Core] Gmail Success', props<{ payload: User }>());
export const loginSuccess = createAction('[Core] Login', props<{ payload: User }>());
export const logout = createAction('[Core] Logout');
export const navigateTo = createAction('[Navigation] Navigate To', props<{ path: string }>());
export const openBottomSheet = createAction('[Core] Open Bottom Sheet', props<{ component: string }>());
export const autoLogin = createAction('[Core] Auto Login');
export const autoLoginSuccess = createAction('[Core] Auto Login Success', props<{ user: User, }>());
export const autoLoginFailed = createAction('[Core] Auto Login Failed', props<{ error: Error, }>());
