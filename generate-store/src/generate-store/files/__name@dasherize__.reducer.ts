import { createReducer, on } from '@ngrx/store';
import { load<%= classify(name) %>, load<%= classify(name) %>Success, load<%= classify(name) %>Failure } from './<%= dasherize(name) %>.actions';

export const featureKey = '<%= camelize(name) %>';

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

export const reducer = createReducer(
  initialState,
  on(load<%= classify(name) %>, (state) => ({...state, loading: true,})),
  on(load<%= classify(name) %>Success, (state, { data }) => ({...state, loading: false, data,})),
  on(load<%= classify(name) %>Failure, (state, { error }) => ({...state, loading: false, error,}))
);
