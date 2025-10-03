import type { BootstrapContext } from '@angular/platform-browser';

import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { CONFIG } from './app/app.config.server';

const BOOTSTRAP = (context: BootstrapContext) =>
  bootstrapApplication(App, CONFIG, context);

export default BOOTSTRAP;
