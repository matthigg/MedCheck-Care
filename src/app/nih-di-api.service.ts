import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihDiApiService {

  constructor() { }

  fetchNIHResults(meds): Observable<any> {
    return of(meds);
  }

}
