import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { upsertUser } from './users.actions';
import { User } from './users.model';

export const featureKey = 'users';

export interface State extends EntityState<User> {
  selectedUserId: string | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user) => user.uid,
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
});

export const reducer = createReducer(
  initialState,
  on(upsertUser, (state, action) => adapter.upsertOne(action.user, state)),
);

export const usersFeature = createFeature({
  name: featureKey,
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } = usersFeature;