import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from '@angular/fire/analytics';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {getPerformance, providePerformance} from '@angular/fire/performance';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {getRemoteConfig, provideRemoteConfig} from '@angular/fire/remote-config';
import {provideServiceWorker} from '@angular/service-worker';
import {provideRouterStore} from '@ngrx/router-store';
import {RootStoreModule} from './store/root/root.module';
import {routes} from './app.routes';
import {environment} from '../environments/environment';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MAT_ICON_DEFAULT_OPTIONS} from '@angular/material/icon';
import {provideHttpClient, withFetch} from '@angular/common/http';


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
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideRouterStore(),
    importProvidersFrom(RootStoreModule),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAnimationsAsync(),
    {
      provide: MAT_ICON_DEFAULT_OPTIONS,
      useValue: {fontSet: 'material-symbols-outlined'},
    },
    provideHttpClient(withFetch()),
  ],
};
