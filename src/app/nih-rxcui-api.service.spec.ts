import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NihRxcuiApiService } from './nih-rxcui-api.service';
import { TestBed } from '@angular/core/testing';

describe('NihRxcuiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: NihRxcuiApiService = TestBed.get(NihRxcuiApiService);
    expect(service).toBeTruthy();
  });
});
