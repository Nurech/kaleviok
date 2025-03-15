import { createReducer, on, createFeature } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as <%= classify(name) %>Actions from './<%= dasherize(name) %>.actions';
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';

export const featureKey = '<%= classify(name) %>';

export const adapter: EntityAdapter<<%= classify(name) %>> = createEntityAdapter<<%= classify(name) %>>({
  selectId: (entity) => entity.id
});

export interface State extends EntityState<<%= classify(name) %>> {
  loading: boolean;
  error: any;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null
});

const <%= camelize(name) %>Reducer = createReducer(
    initialState,
    on(<%= classify(name) %>Actions.load, (state) => ({ ...state, loading: true })),
    on(<%= classify(name) %>Actions.loadSuccess, (state, { payload }) => adapter.setAll(payload, { ...state, loading: false })),
    on(<%= classify(name) %>Actions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const <%= camelize(name) %>Feature = createFeature({
  name: featureKey,
  reducer: <%= camelize(name) %>Reducer
});
