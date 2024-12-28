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

export function logState(reducer: any) {
  return (state: any, action: any) => {
    const nextState = reducer(state, action);
    console.log('Next State:', nextState);
    return nextState;
  };
}

export const metaReducers: MetaReducer[] = [logState];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([RouterEffects]),
    StoreModule.forRoot(
      {
        auth: authFeature.reducer,
        router: routerReducer,
        users: usersFeature.reducer,
      },
      { metaReducers },
    ),
    AuthStoreModule,
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
