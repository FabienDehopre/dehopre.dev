import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Seo } from './seo';

describe('Seo', () => {
  let service: Seo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({}),
            firstChild: null,
            outlet: 'primary'
          }
        }
      ]
    });
    service = TestBed.inject(Seo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
