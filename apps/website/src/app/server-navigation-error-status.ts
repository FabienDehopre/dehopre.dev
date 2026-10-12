import type { EnvironmentProviders } from '@angular/core';

import { injectResponse } from '@analogjs/router/tokens';
import { inject, provideEnvironmentInitializer } from '@angular/core';
import { NavigationError, Router } from '@angular/router';

/**
 * Answers a server render with HTTP 500 when the navigation fails (e.g. a page's server `load` throws).
 * Angular would otherwise render an empty page with 200, so prerendering would ship it; with Nitro's
 * `prerender.failOnError`, the 500 fails the build instead (see ADR 0001).
 */
export function provideServerNavigationErrorStatus(): EnvironmentProviders {
  return provideEnvironmentInitializer(() => {
    const response = injectResponse();
    if (!response) {
      return;
    }

    inject(Router).events.subscribe((event) => {
      if (event instanceof NavigationError) {
        response.statusCode = 500;
      }
    });
  });
}
