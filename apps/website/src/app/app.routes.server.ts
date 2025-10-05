import type { ServerRoute } from '@angular/ssr';

import { RenderMode } from '@angular/ssr';

export const SERVER_ROUTES: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
