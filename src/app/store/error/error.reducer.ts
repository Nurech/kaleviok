import { createReducer, on, createFeature } from '@ngrx/store';
import { loadError, loadErrorSuccess, loadErrorFailure } from './error.actions';

export const featureKey = 'error';

export interface State {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const errorReducer = createReducer(
  initialState,
  on(loadError, (state) => ({ ...state, loading: true })),
  on(loadErrorSuccess, (state, { data }) => ({ ...state, loading: false, data })),
  on(loadErrorFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const errorFeature = createFeature({
  name: featureKey,
  reducer: errorReducer,
});
