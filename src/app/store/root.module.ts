import { isDevMode, NgModule } from '@angular/core';
import { MetaReducer, StoreModule, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { appSettingsFeature } from './app-settings/app-settings.reducer';
import { AppSettingsStoreModule } from './app-settings/app-settings.module';
import { FilesStoreModule } from './files/files.module';
import { eventsFeature } from './events/events.reducer';
import { EventsStoreModule } from './events/events.module';
import { snackbarFeature } from './snackbar/snackbar.reducer';
import { SnackbarStoreModule } from './snackbar/snackbar.module';
import { coreFeature } from './core/core.reducer';
import { settingsFeature } from './settings/settings.reducer';
import { SettingsStoreModule } from './settings/settings.module';
import { accountsFeature } from './accounts/accounts.reducer';
import { RouterEffects } from './router/router.effects';
import { authFeature } from './auth/auth.reducer';
import { AuthStoreModule } from './auth/auth.module';
import { UsersStoreModule } from './accounts/accounts.module';
import { RouterStoreModule } from './router/router-store.module';
import { CoreStoreModule } from './core/core.module';
import { filesFeature } from './files/files.reducer';

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
                console.error(`Used: [${localStorageUsage}] Action/State: `, action, nextState);
            } else {
                console.log(`Used: [${localStorageUsage}] Action/State: `, action, nextState);
            }
        }

        return nextState;
    };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [''],
        rehydrate: true,
        removeOnUndefined: true,
        storageKeySerializer: (key) => `app_${key}`
    })(reducer);
}

export const metaReducers: MetaReducer[] = [logState, localStorageSyncReducer];

const rootReducers: ActionReducerMap<any> = {
    appSettings: appSettingsFeature.reducer,
    events: eventsFeature.reducer,
    snackbar: snackbarFeature.reducer,
    core: coreFeature.reducer,
    settings: settingsFeature.reducer,
    router: routerReducer,
    auth: authFeature.reducer,
    accounts: accountsFeature.reducer,
    files: filesFeature.reducer
};

const featureModules = [
    AppSettingsStoreModule,
    FilesStoreModule,
    EventsStoreModule,
    SnackbarStoreModule,
    CoreStoreModule,
    SettingsStoreModule,
    RouterStoreModule,
    AuthStoreModule,
    UsersStoreModule
];

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
            connectInZone: true
        })
    ]
})
export class RootStoreModule {}
