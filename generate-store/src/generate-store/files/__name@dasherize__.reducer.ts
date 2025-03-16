import { createReducer, on, createFeature } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as <%= classify(name) %>Actions from './<%= dasherize(name) %>.actions';
import { <%= singular(classify(name)) %> } from './<%= dasherize(name) %>.model';

export const featureKey = '<%= classify(name) %>';

export const adapter: EntityAdapter<<%= singular(classify(name)) %>> = createEntityAdapter<<%= singular(classify(name)) %>>({
  selectId: (entity) => entity.id
});

export interface State extends EntityState<<%= singular(classify(name)) %>> {
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
    on(<%= classify(name) %>Actions.modified, (state, { id, changes }) => adapter.updateOne({ id, changes }, state)),
    on(<%= classify(name) %>Actions.added, (state, { payload }) => adapter.addOne(payload, state)),
    on(<%= classify(name) %>Actions.removed, (state, { payload }) => adapter.removeOne(payload.id, state))
);

export const <%= camelize(name) %>Feature = createFeature({
  name: featureKey,
  reducer: <%= camelize(name) %>Reducer
});
