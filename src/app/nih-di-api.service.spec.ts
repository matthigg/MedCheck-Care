import { TestBed } from '@angular/core/testing';

import { NihDiApiService } from './nih-di-api.service';

describe('NihDiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NihDiApiService = TestBed.get(NihDiApiService);
    expect(service).toBeTruthy();
  });
});
