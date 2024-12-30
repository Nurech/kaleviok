import { createFeatureSelector, createSelector } from '@ngrx/store';
import { <%= camelize(name) %>Feature } from './<%= dasherize(name) %>.reducer';

export const select<%= classify(name) %>State = <%= camelize(name) %>Feature.select<%= classify(name) %>State;

export const selectData = createSelector(select<%= classify(name) %>State, (state) => state.data);

export const selectLoading = createSelector(select<%= classify(name) %>State, (state) => state.loading);

export const selectError = createSelector(select<%= classify(name) %>State, (state) => state.error);
