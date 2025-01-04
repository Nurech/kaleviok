import { createAction, props } from '@ngrx/store';
import { Snackbar } from './snackbar.model';

export const openSnackbar = createAction('[Snackbar] Open', props<{ data: string | Snackbar }>());
export const closeAllSnackbars = createAction('[Snackbar] Close All');
