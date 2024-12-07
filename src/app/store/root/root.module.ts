import {isDevMode, NgModule} from '@angular/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {usersFeature} from '../user/user.reducer';
import {CoreStoreModule} from '../core/core.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {coreFeature} from '../core/core.reducer';

export function logState(reducer: any): any {
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
    EffectsModule.forRoot(),
    StoreModule.forRoot(
      {
        core: coreFeature.reducer,
        users: usersFeature.reducer
      }, {metaReducers}
    ),
    CoreStoreModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
  ],
})
export class RootStoreModule {
}
