import { TestBed } from '@angular/core/testing';

import { NihPropertiesApiService } from './nih-properties-api.service';

describe('NihPropertiesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NihPropertiesApiService = TestBed.get(NihPropertiesApiService);
    expect(service).toBeTruthy();
  });
});
