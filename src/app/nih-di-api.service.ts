import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihDiApiService {

  constructor(private http: HttpClient) { }
  // constructor() { }

  fetchNIHResults(meds): Observable<any> {
    const nihBaseURL = 'https://rxnav.nlm.nih.gov/REST/rxcui?name='
    // this.http.get('asdf')
    return of(meds);
  }

}
