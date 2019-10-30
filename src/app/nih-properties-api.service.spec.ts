import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NihPropertiesApiService } from './nih-properties-api.service';
import { TestBed } from '@angular/core/testing';

describe('NihPropertiesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: NihPropertiesApiService = TestBed.get(NihPropertiesApiService);
    expect(service).toBeTruthy();
  });
});
