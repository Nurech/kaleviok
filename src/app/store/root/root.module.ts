import {NgModule} from '@angular/core';
import {MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CommonModule} from '@angular/common';
import {usersFeature} from '../user/user.reducer';
import {coreFeature, reducer as coreReducer} from '../core/core.reducer';

export interface AppState {
  users: ReturnType<typeof usersFeature.reducer>;
  core: ReturnType<typeof coreFeature.reducer>;
}

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
    StoreModule.forRoot(
      {
        core: coreReducer,
      },
      {
        metaReducers,
      }
    ),
    StoreModule.forFeature(usersFeature.name, usersFeature.reducer),
    EffectsModule.forRoot(),
  ],
})
export class RootStoreModule {
}
