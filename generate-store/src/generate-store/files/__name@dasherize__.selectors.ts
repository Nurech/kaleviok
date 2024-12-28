import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './<%= dasherize(name) %>.reducer';

export const select<%= classify(name) %>State = createFeatureSelector<State>('<%= camelize(name) %>');

export const selectData = createSelector(
  select<%= classify(name) %>State,
  (state) => state.data
);

export const selectLoading = createSelector(
  select<%= classify(name) %>State,
  (state) => state.loading
);

export const selectError = createSelector(
  select<%= classify(name) %>State,
  (state) => state.error
);
