import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NihRxnormApiService } from './nih-rxnorm-api.service';
import { TestBed } from '@angular/core/testing';

describe('NihRxnormApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: NihRxnormApiService = TestBed.get(NihRxnormApiService);
    expect(service).toBeTruthy();
  });
});
