import type { ApplicationRef } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { CONFIG } from './app/app.config.server';

// eslint-disable-next-line @typescript-eslint/naming-convention
const bootstrap = (): Promise<ApplicationRef> => bootstrapApplication(App, CONFIG);

export default bootstrap;
