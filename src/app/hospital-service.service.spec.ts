import { TestBed } from '@angular/core/testing';

import { HospitalServiceService } from './hospital-service.service';

describe('HospitalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalServiceService = TestBed.get(HospitalServiceService);
    expect(service).toBeTruthy();
  });
});
