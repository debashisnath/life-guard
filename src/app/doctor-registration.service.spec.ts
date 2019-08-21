import { TestBed } from '@angular/core/testing';

import { DoctorRegistrationService } from './doctor-registration.service';

describe('DoctorRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorRegistrationService = TestBed.get(DoctorRegistrationService);
    expect(service).toBeTruthy();
  });
});
