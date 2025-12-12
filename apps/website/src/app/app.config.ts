import type { ApplicationConfig } from '@angular/core';

import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withPrismHighlighter } from '@analogjs/content/prism-highlighter';
import { provideFileRouter, requestContextInterceptor, withDebugRoutes } from '@analogjs/router';
import { provideCloudflareLoader } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { withComponentInputBinding, withDebugTracing, withRouterConfig } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideFileRouter(
      withComponentInputBinding(),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
        paramsInheritanceStrategy: 'always',
      }),
      ...(isDevMode() ? [withDebugRoutes()] : []),
      ...(isDevMode() ? [withDebugTracing()] : [])
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(withEventReplay()),
    ...(isDevMode() ? [] : provideCloudflareLoader('https://dehopre.dev/')),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
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
