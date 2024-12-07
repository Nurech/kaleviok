import {createAction, props} from '@ngrx/store';
import {User} from '../user/user.model';

export const startGmailAuthentication = createAction(
  '[Core/API] Start Gmail Authentication'
);

export const startGmailAuthenticationError = createAction(
  '[Core/API] Gmail Authentication Error', props<{ error: Error }>()
);

export const startGmailAuthenticationSuccess = createAction(
  '[Core/API] Gmail Authentication Success', props<{ payload: User }>()
);

export const loginSuccess = createAction(
  '[Core/API] Login', props<{ payload: User }>()
);

export const logout = createAction(
  '[Core/API] Logout'
);
