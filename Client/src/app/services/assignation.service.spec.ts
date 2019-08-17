import { TestBed } from '@angular/core/testing';

import { AssignationService } from './assignation.service';

describe('AssignationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignationService = TestBed.get(AssignationService);
    expect(service).toBeTruthy();
  });
});
