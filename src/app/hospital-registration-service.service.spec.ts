import { TestBed } from '@angular/core/testing';

import { HospitalRegistrationServiceService } from './hospital-registration-service.service';

describe('HospitalRegistrationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalRegistrationServiceService = TestBed.get(HospitalRegistrationServiceService);
    expect(service).toBeTruthy();
  });
});
