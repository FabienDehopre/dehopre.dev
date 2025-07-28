import { Route } from '@angular/router';

import {MetaInfo} from "./types/meta-info";
import {MenuItem} from "./types/menu-item";

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    data: {
      meta: {
        title: 'Fabien Dehopré - Fullstack developer (Angular, ASP.NET Web API)',
        description: 'I\'m Fabien Dehopré, a fullstack developer using Angular and ASP.NET Core Web API. I am a consultant at Satellit sprl as a Senior Fullstack Developer and expert Angular Developer.',
      } satisfies MetaInfo,
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    data: {
      meta: {
        title: 'About',
        description: 'I\'m Fabien Dehopré. I live in Brussels (Bruxelles).',
      } satisfies MetaInfo,
      menuItem: {
        label: 'About',
        href: ['/', 'about']
      } satisfies MenuItem,
    }
  },
  {
    path: '**',
    redirectTo: '',
  }
];
