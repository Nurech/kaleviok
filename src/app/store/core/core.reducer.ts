import { createReducer, on, createFeature } from '@ngrx/store';
import { loadCore } from './core.actions';

export const featureKey = 'core';

export interface State {
    loading: boolean;
    error: any;
}

export const initialState: State = {
    loading: false,
    error: null
};

const coreReducer = createReducer(
    initialState,
    on(loadCore, (state) => ({ ...state }))
);

export const coreFeature = createFeature({
    name: featureKey,
    reducer: coreReducer
});
