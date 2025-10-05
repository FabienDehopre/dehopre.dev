import type { ApplicationConfig } from '@angular/core';

import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { APP_CONFIG } from './app.config';
import { SERVER_ROUTES } from './app.routes.server';

const SERVER_CONFIG: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(SERVER_ROUTES))],
};

export const CONFIG = mergeApplicationConfig(APP_CONFIG, SERVER_CONFIG);
