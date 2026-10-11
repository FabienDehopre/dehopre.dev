import type { ServerResponse } from 'node:http';

import { RESPONSE } from '@analogjs/router/tokens';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { provideServerNavigationErrorStatus } from './server-navigation-error-status';

@Component({ selector: 'app-blank', template: '' })
class Blank {}

function setUp() {
  const response = { statusCode: 200 } as ServerResponse;
  TestBed.configureTestingModule({
    providers: [
      provideRouter([
        { path: 'ok', component: Blank, resolve: { load: () => ({}) } },
        {
          path: 'broken',
          component: Blank,
          resolve: {
            load: () => {
              throw new Error('Failed to load Project owner/repo from GitHub');
            },
          },
        },
      ]),
      { provide: RESPONSE, useValue: response },
      provideServerNavigationErrorStatus(),
    ],
  });

  return { response, router: TestBed.inject(Router) };
}

describe(provideServerNavigationErrorStatus.name, () => {
  test('answers 500 when a route fails to load its data, so prerendering fails the build', async () => {
    const { response, router } = setUp();

    await expect(router.navigateByUrl('/broken')).rejects.toThrow('owner/repo');

    expect(response.statusCode).toBe(500);
  });

  test('keeps 200 when the route loads', async () => {
    const { response, router } = setUp();

    await router.navigateByUrl('/ok');

    expect(response.statusCode).toBe(200);
  });
});
