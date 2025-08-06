import type {
  ApplicationConfig } from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withDebugTracing, withRouterConfig } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { APP_ROUTES } from './app.routes';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    // eslint-disable-next-line @angular-eslint/no-developer-preview -- will soon be promoted to official api
    provideZonelessChangeDetection(),
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
        paramsInheritanceStrategy: 'always',
      }),
      ...(isDevMode() ? [withDebugTracing()] : [])
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        options: {
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
  ],
};
