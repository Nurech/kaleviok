import { createReducer, createFeature } from '@ngrx/store';

export const featureKey = 'snackbar';

export interface State {
    data: any;
    loading: boolean;
    error: any;
}

export const initialState: State = {
    data: null,
    loading: false,
    error: null
};

const snackbarReducer = createReducer(initialState);

export const snackbarFeature = createFeature({
    name: featureKey,
    reducer: snackbarReducer
});
