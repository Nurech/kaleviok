import {createFeature, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {
  addUser,
  addUsers, clearUsers,
  deleteUser, deleteUsers, loadUsers,
  updateUser,
  updateUsers,
  upsertUser,
  upsertUsers,
} from './user.actions';
import {User} from './user.model';
import {startGmailAuthenticationSuccess} from '../core/core.actions';

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
  on(addUser, (state, action) => adapter.addOne(action.user, state)),
  on(upsertUser, (state, action) => adapter.upsertOne(action.user, state)),
  on(startGmailAuthenticationSuccess, (state, action) => adapter.upsertOne(action.user, state)),
  on(addUsers, (state, action) => adapter.addMany(action.users, state)),
  on(upsertUsers, (state, action) => adapter.upsertMany(action.users, state)),
  on(updateUser, (state, action) => adapter.updateOne(action.user, state)),
  on(updateUsers, (state, action) => adapter.updateMany(action.users, state)),
  on(deleteUser, (state, action) => adapter.removeOne(action.id, state)),
  on(deleteUsers, (state, action) => adapter.removeMany(action.ids, state)),
  on(loadUsers, (state, action) => adapter.setAll(action.users, state)),
  on(clearUsers, (state) => adapter.removeAll(state)),
);

export const usersFeature = createFeature({
  name: featureKey,
  reducer,
  extraSelectors: ({selectUsersState}) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

export const {selectIds, selectEntities, selectAll, selectTotal} = usersFeature;
