import { render } from '@analogjs/router/server';

import { AppComponent } from './app/app';
import { CONFIG } from './app/app.config.server';

import 'zone.js/node';
import '@angular/platform-server/init';

export default render(AppComponent, CONFIG);
