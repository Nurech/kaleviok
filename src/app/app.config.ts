import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { provideServiceWorker } from '@angular/service-worker';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
    MissingTranslationHandler,
    provideTranslateService,
    TranslateLoader,
    TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { MissingTranslationService } from './shared/services/missing-translation.service';
import { PwaService } from './shared/services/pwa.service';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { RootStoreModule } from './store/root.module';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
    providers: [
        provideStoreDevtools({
            maxAge: 25,
            traceLimit: 75,
            connectInZone: true
        }),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideAnalytics(() => getAnalytics()),
        ScreenTrackingService,
        UserTrackingService,
        provideHttpClient(withInterceptorsFromDi()),
        provideFunctions(() => getFunctions()),
        provideMessaging(() => getMessaging()),
        providePerformance(() => getPerformance()),
        provideStorage(() => getStorage()),
        provideRemoteConfig(() => getRemoteConfig()),
        provideRouterStore(),
        importProvidersFrom(RootStoreModule),
        provideServiceWorker('ngsw-worker.js', {
            enabled: false,
            registrationStrategy: 'registerImmediately'
        }),
        provideAnimationsAsync(),
        {
            provide: MAT_ICON_DEFAULT_OPTIONS,
            useValue: { fontSet: 'material-symbols-outlined' }
        },
        provideTranslateService({
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MissingTranslationService
            },
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'et'
        }),
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [TranslateService, PwaService],
            multi: true
        }
    ]
};

export function appInitializerFactory(translateService: TranslateService): () => Promise<void> {
    return async () => {
        await firstValueFrom(translateService.use('en'));
    };
}
