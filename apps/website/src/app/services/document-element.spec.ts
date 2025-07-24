import { TestBed } from '@angular/core/testing';

import { DocumentElement } from './document-element';

describe('DocumentElement', () => {
  let service: DocumentElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentElement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
