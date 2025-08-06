import { TestBed } from '@angular/core/testing';

import { Theme } from './theme';

describe('theme', () => {
  let service: Theme;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Theme);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
