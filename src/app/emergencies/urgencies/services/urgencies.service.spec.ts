import { TestBed } from '@angular/core/testing';

import { UrgenciesService } from './urgencies.service';

describe('UrgenciesService', () => {
  let service: UrgenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
