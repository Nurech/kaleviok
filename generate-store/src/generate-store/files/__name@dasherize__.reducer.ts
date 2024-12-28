import { createReducer, on } from '@ngrx/store';
import { <%= classify(name) %>Actions } from './<%= dasherize(name) %>.actions';

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
  on(<%= classify(name) %>Actions.load<%= classify(name) %>, (state) => ({
    ...state,
    loading: true,
  })),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>Success, (state, { data }) => ({
    ...state,
    loading: false,
    data,
  })),
  on(<%= classify(name) %>Actions.load<%= classify(name) %>Failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
