import {createAction, props} from '@ngrx/store';
import {SnackbarState} from './snackbar.reducer';

export const snackbarAutologin = createAction('[Snackbar] Start Auto Login', props<{ payload: SnackbarState }>());

