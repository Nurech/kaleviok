import {createFeature, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {
  upsertUser,
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
  on(upsertUser, (state, action) => adapter.upsertOne(action.user, state)),
  on(startGmailAuthenticationSuccess, (state, action) => adapter.upsertOne(action.user, state)),
);

export const usersFeature = createFeature({
  name: featureKey,
  reducer,
  extraSelectors: ({selectUsersState}) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

export const {selectIds, selectEntities, selectAll, selectTotal} = usersFeature;
