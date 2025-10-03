import {bootstrapApplication, BootstrapContext} from '@angular/platform-browser';
import { App } from './app/app';
import { CONFIG } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
