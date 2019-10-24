import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NihDiApiService } from './nih-di-api.service';
import { TestBed } from '@angular/core/testing';
 
describe('NihDiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({ 
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: NihDiApiService = TestBed.get(NihDiApiService);
    expect(service).toBeTruthy();
  });
});
