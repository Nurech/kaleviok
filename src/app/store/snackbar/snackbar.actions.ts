import { createAction, props } from '@ngrx/store';
import { Snackbar } from './snackbar.model';

export const openSnackbar = createAction('[Snackbar] Open', props<{ data: string | Snackbar }>());
