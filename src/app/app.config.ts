import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CoreEnvironmentService } from './core/services/core.environment.service';
import { CoreAuthenticationService } from './core/services/core.authentication.service';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ResourceLoader } from '@angular/compiler';
import { CoreSessionService } from './core/services/core.session.service';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { CoreSubscriptionService } from './core/services/core.subscription.service';

export function getBaseUrl() {
  return '/';
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),importProvidersFrom([
    NgxUiLoaderModule.forRoot({
      fgsSize: 36,
      hasProgressBar: false,
      logoPosition: 'bottom-left',
      fgsColor: '#a100ff',
      textColor: '#d8d5d5',
      logoSize: 400,
    }),
    NgxUiLoaderRouterModule.forRoot({showForeground:true}),CoreSubscriptionService,CoreEnvironmentService]),
    { provide: 'APP_ID', useValue: 'ng-cli-universal' },
    { provide: 'BASE_URL', useFactory: getBaseUrl,deps:[] },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
    provide: APP_INITIALIZER,
    deps: [CoreEnvironmentService, CoreAuthenticationService],
    multi: true,
    useFactory: (coreEnvironmentService: CoreEnvironmentService, coreAuthenticationService: CoreAuthenticationService) => (): Promise<void> => {
        return coreEnvironmentService.initializeEnvironment().then(() => {
            return coreAuthenticationService.bootstrap();
        });
    }
  }
  ]
};
