import {ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {getPerformance, providePerformance} from '@angular/fire/performance';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {getRemoteConfig, provideRemoteConfig} from '@angular/fire/remote-config';
import {provideServiceWorker} from '@angular/service-worker';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {provideStore} from '@ngrx/store';
import {RootStoreModule} from './store/root/root.module';
import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {MetaReducer} from '@ngrx/store';
import {reducer} from './store/core/core.reducer';

export function logState() {
  return (state: any, action: any) => {
    const nextState = reducer(state, action);
    console.log('Next State:', nextState);
    return nextState;
  };
}

export const metaReducers: MetaReducer[] = [logState];


export const appConfig: ApplicationConfig = {
  providers: [
    provideStoreDevtools(
      {
        maxAge: 25,
        traceLimit: 75,
        connectInZone: true
      }
    ),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    metaReducers,
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideRouterStore(),
    importProvidersFrom(RootStoreModule),
    provideStore({
      router: routerReducer,
    }, {
      metaReducers,
    }),
  ],
};
