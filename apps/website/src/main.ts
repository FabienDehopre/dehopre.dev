import { bootstrapApplication } from '@angular/platform-browser';
import { APP_CONFIG } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, APP_CONFIG).catch((err) => console.error(err));
