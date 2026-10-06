import type { ApplicationConfig } from '@angular/core';

import { provideContent, withMarkdownRenderer } from '@analogjs/content';
import { withPrismHighlighter } from '@analogjs/content/prism-highlighter';
import { provideFileRouter, requestContextInterceptor, withDebugRoutes } from '@analogjs/router';
import { provideNetlifyLoader } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isDevMode, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay, withNoIncrementalHydration } from '@angular/platform-browser';
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-assignment
      ...(isDevMode() ? [withDebugRoutes()] : []),
      ...(isDevMode() ? [withDebugTracing()] : [])
    ),
    provideHttpClient(
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(withEventReplay(), withNoIncrementalHydration()),
    ...(isDevMode() ? [] : provideNetlifyLoader('https://dehopre.dev/')),
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
