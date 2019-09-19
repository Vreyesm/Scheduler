import { TestBed } from '@angular/core/testing';

import { AssignationRequestService } from './assignation-request.service';

describe('AssignationRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignationRequestService = TestBed.get(AssignationRequestService);
    expect(service).toBeTruthy();
  });
});
