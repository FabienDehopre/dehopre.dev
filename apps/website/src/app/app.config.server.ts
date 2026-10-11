import type { ApplicationConfig } from '@angular/core';

import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

import { APP_CONFIG } from './app.config';
import { provideServerNavigationErrorStatus } from './server-navigation-error-status';

const SERVER_CONFIG: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerNavigationErrorStatus()],
};

export const CONFIG = mergeApplicationConfig(APP_CONFIG, SERVER_CONFIG);
