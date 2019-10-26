import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihRxnormApiService {

  constructor(private http: HttpClient) { }

  // Send a request to the NIH RxNorm API with the intention of retrieving RxCUI
  // values for each medication name in a meds[] array.
  fetchRxNormApi(meds: string[]): Observable<object>[] {
    const rxNormObservables: Observable<object>[] = [];
    meds.forEach(med => {
      if (med) {
        rxNormObservables.push(this.http.get('https://rxnav.nlm.nih.gov/REST/rxcui?name=' + med));
      }
    });
    return rxNormObservables;
  }

}
