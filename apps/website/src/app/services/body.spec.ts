import { TestBed } from '@angular/core/testing';

import { Body } from './body';

describe('Body', () => {
  let service: Body;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Body);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
