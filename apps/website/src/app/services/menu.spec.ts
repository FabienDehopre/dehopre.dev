import { TestBed } from '@angular/core/testing';

import { Menu } from './menu';

describe(Menu.name, () => {
  let service: Menu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Menu);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
