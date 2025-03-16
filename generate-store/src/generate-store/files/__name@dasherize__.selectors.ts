import { createSelector } from '@ngrx/store';
import { <%= camelize(name) %>Feature, adapter } from './<%= dasherize(name) %>.reducer';

export const select<%= classify(name) %>State = <%= camelize(name) %>Feature.select<%= classify(name) %>State;

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = adapter.getSelectors(select<%= classify(name) %>State);

export const selectById = (id: string) => createSelector(selectEntities, (entities) => entities[id]);
export const selectLoading = createSelector(select<%= classify(name) %>State, (state) => state.loading);
export const selectError = createSelector(select<%= classify(name) %>State, (state) => state.error);
