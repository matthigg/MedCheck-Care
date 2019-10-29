import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NihApproxTermService } from './nih-approx-term.service';
import { TestBed } from '@angular/core/testing';


describe('NihApproxTermService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: NihApproxTermService = TestBed.get(NihApproxTermService);
    expect(service).toBeTruthy();
  });
});
