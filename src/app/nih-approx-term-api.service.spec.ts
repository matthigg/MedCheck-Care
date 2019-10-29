import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NihApproxTermApiService } from './nih-approx-term-api.service';
import { TestBed } from '@angular/core/testing';


describe('NihApproxTermApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: NihApproxTermApiService = TestBed.get(NihApproxTermApiService);
    expect(service).toBeTruthy();
  });
});
