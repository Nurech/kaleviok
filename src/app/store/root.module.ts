import { isDevMode, NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';
import { coreFeature } from './core/core.reducer';
import { settingsFeature } from './settings/settings.reducer';
import { SettingsStoreModule } from './settings/settings.module';
import { accountsFeature } from './accounts/accounts.reducer';
import { RouterEffects } from './router/router.effects';
import { authFeature } from './auth/auth.reducer';
import { AuthStoreModule } from './auth/auth.module';
import { UsersStoreModule } from './accounts/accounts.module';
import { RouterStoreModule } from './router/router-store.module';
import { name } from '../../../package.json';
import { CoreStoreModule } from './core/core.module';

function calculateLocalStorageUsage(): string {
  const totalSize = new TextEncoder().encode(JSON.stringify(localStorage)).length;
  const maxLimitMB = 10;
  const usedMB = (totalSize / (1024 * 1024)).toFixed(2);
  return `${usedMB}/${maxLimitMB} MB`;
}

export function logState(reducer: any) {
  return (state: any, action: any) => {
    const nextState = reducer(state, action);

    if (isDevMode()) {
      const localStorageUsage = calculateLocalStorageUsage();
      if (action?.error) {
        console.error(`Used: [${localStorageUsage}] State: `, nextState, action);
      } else {
        console.log(`Used: [${localStorageUsage}] State: `, nextState, action);
      }
    }

    return nextState;
  };
}

function deleteNestedProperty(obj: any, path: string): void {
  const parts = path.split('.');
  let current = obj;
  while (parts.length > 1) {
    const key = parts.shift()!;
    if (!current[key]) return;
    current = current[key];
  }
  delete current[parts[0]];
}

export function localStorageSyncReducer(reducer: any): any {
  const exclude = ['auth.isAuthenticated'];
  return (state: any, action: any) => {
    if (state === undefined) {
      const storedState = localStorage.getItem(`${name}-state`);
      if (storedState) {
        const parsed = JSON.parse(storedState) || {};
        console.warn('State is undefined, initializing with localStorage: ', parsed);
        exclude.forEach((prop) => deleteNestedProperty(parsed, prop));
        return reducer(parsed, action);
      }
      return reducer(state, action);
    }

    const nextState = reducer(state, action);
    localStorage.setItem(`${name}-state`, JSON.stringify(nextState));

    return nextState;
  };
}

export const metaReducers: MetaReducer[] = [logState, localStorageSyncReducer];

// Feature reducers
const rootReducers = {
  core: coreFeature.reducer,
  settings: settingsFeature.reducer,
  router: routerReducer,
  auth: authFeature.reducer,
  accounts: accountsFeature.reducer,
};

// Feature modules
const featureModules = [CoreStoreModule, SettingsStoreModule, RouterStoreModule, AuthStoreModule, UsersStoreModule];

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
