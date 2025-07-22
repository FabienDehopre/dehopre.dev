import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    data: {
      title: 'Fabien Dehopré - Fullstack developer (Angular, ASP.NET Web API)',
      description: 'I\'m Fabien Dehopré, a fullstack developer using Angular and ASP.NET Core Web API. I am a consultant at Satellit sprl as a Senior Fullstack Developer and expert Angular Developer.',
    }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    data: {
      title: 'TODO',
      description: 'TODO',
    }
  },
  {
    path: '**',
    redirectTo: '',
  }
];
