import { TestBed } from '@angular/core/testing';

import { NihApproxTermService } from './nih-approx-term.service';

describe('NihApproxTermService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NihApproxTermService = TestBed.get(NihApproxTermService);
    expect(service).toBeTruthy();
  });
});
