import {ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {getPerformance, providePerformance} from '@angular/fire/performance';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {getRemoteConfig, provideRemoteConfig} from '@angular/fire/remote-config';
import {provideStore} from '@ngrx/store';
import {environment} from '../environments/environment';
import {provideServiceWorker} from '@angular/service-worker';
import {provideEffects} from '@ngrx/effects';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {RootStoreModule} from './store/root/root.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideEffects(),
    provideRouterStore(),
    importProvidersFrom(RootStoreModule),
    provideStore({}),
    provideEffects([]),
    provideStore({
      router: routerReducer,
    }),
  ],
};
