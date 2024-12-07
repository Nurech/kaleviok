import {createAction, props} from '@ngrx/store';
import {User} from '../user/user.model';

export const startGmailAuthentication = createAction(
  '[Core/API] Start Gmail Authentication'
);

export const startGmailAuthenticationError = createAction(
  '[Core/API] Gmail Authentication Error', props<{ error: Error }>()
);

export const startGmailAuthenticationSuccess = createAction(
  '[Core/API] Gmail Authentication Success', props<{ user: User }>()
);

export const login = createAction(
  '[Core/API] Login', props<{ user: User }>()
);

export const logout = createAction(
  '[Core/API] Logout'
);
