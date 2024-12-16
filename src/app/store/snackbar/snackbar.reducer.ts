import {createFeature, createReducer, on} from '@ngrx/store';
import {snackbarAutologin} from './snackbar.actions';

export const featureKey = 'snackbar';

export interface SnackbarState {
  show: boolean;
  success: boolean;
  failure: boolean;
}

export interface State {
  autoLogin: SnackbarState;
}

export const initialState: State = {
  autoLogin: { show: false, success: false, failure: false },
};

export const reducer = createReducer(
  initialState,
  on(snackbarAutologin, (state, {payload}) => ({...state, autoLogin: payload}))
);

export const snackbarFeature = createFeature({
  name: featureKey,
  reducer,
});
