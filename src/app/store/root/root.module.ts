import { isDevMode, NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';
import { usersFeature } from '../users/users.reducer';
import { RouterEffects } from '../router/router.effects';
import { authFeature } from '../auth/auth.reducer';
import { AuthStoreModule } from '../auth/auth.module';
import { UsersStoreModule } from '../users/users.module';
import { RouterStoreModule } from '../router/router-store.module';

// Meta reducers
export function logState(reducer: any) {
  return (state: any, action: any) => {
    const nextState = reducer(state, action);
    console.log('Next State:', nextState);
    return nextState;
  };
}

export const metaReducers: MetaReducer[] = [logState];

// Feature reducers
const rootReducers = {
  router: routerReducer,
  auth: authFeature.reducer,
  users: usersFeature.reducer,
};

// Feature modules
const featureModules = [RouterStoreModule, AuthStoreModule, UsersStoreModule];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([RouterEffects]),
    StoreModule.forRoot(rootReducers, { metaReducers }),
    ...featureModules,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
})
export class RootStoreModule {}
