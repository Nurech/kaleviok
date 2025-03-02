import { isDevMode, NgModule } from '@angular/core';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';
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

export function hydrateReducer(reducer: any): any {
    // Define keys to persist (e.g., 'events.tempEvent')
    const keysToPersist = ['events.tempEvent'];

    return (state: any, action: any) => {
        if (state === undefined) {
            const restoredState: any = {};

            keysToPersist.forEach((keyPath) => {
                const storedValue = localStorage.getItem(`${keyPath}-state`);
                if (storedValue) {
                    const parsedValue = JSON.parse(storedValue);
                    console.log(`Rehydrating ${keyPath} from localStorage: `, parsedValue);

                    // Deep merge into state
                    const [rootKey, subKey] = keyPath.split('.');
                    restoredState[rootKey] = {
                        ...restoredState[rootKey],
                        [subKey]: parsedValue
                    };
                }
            });

            return reducer({ ...state, ...restoredState }, action);
        }

        const nextState = reducer(state, action);

        keysToPersist.forEach((keyPath) => {
            const [rootKey, subKey] = keyPath.split('.');
            if (nextState?.[rootKey]?.[subKey] !== undefined) {
                localStorage.setItem(`${keyPath}-state`, JSON.stringify(nextState[rootKey][subKey]));
            }
        });

        return nextState;
    };
}

export const metaReducers: MetaReducer[] = [logState, hydrateReducer];

// Feature reducers
const rootReducers = {
    events: eventsFeature.reducer,
    snackbar: snackbarFeature.reducer,
    core: coreFeature.reducer,
    settings: settingsFeature.reducer,
    router: routerReducer,
    auth: authFeature.reducer,
    accounts: accountsFeature.reducer
};

// Feature modules
const featureModules = [
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
