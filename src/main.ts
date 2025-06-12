import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app';
import { APP_CONFIG } from './app/app.config';

import 'zone.js';

await bootstrapApplication(AppComponent, APP_CONFIG);
