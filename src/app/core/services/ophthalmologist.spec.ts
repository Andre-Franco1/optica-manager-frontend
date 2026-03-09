import { TestBed } from '@angular/core/testing';

import { OphthalmologistService } from './ophthalmologist';

describe('Ophthalmologist', () => {
  let service: OphthalmologistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OphthalmologistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
