import { TestBed } from '@angular/core/testing';

import { NihRxcuiApiService } from './nih-rxcui-api.service';

describe('NihRxcuiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NihRxcuiApiService = TestBed.get(NihRxcuiApiService);
    expect(service).toBeTruthy();
  });
});
