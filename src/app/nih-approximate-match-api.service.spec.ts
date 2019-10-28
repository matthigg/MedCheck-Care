import { TestBed } from '@angular/core/testing';

import { NihApproximateMatchApiService } from './nih-approximate-match-api.service';

describe('NihApproximateMatchApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NihApproximateMatchApiService = TestBed.get(NihApproximateMatchApiService);
    expect(service).toBeTruthy();
  });
});
