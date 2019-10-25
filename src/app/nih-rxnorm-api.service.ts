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
  fetchNihRxnormApi(meds: string[]): {med: string, observable: Observable<object>}[] {
    const medObservables: {med, observable}[] = []
    const nihRxnormBaseURL = 'https://rxnav.nlm.nih.gov/REST/rxcui?name='
    meds.forEach(med => {
      if (med) {
        medObservables.push({ 'med': med, 'observable': this.http.get(nihRxnormBaseURL + med)})
      }
    })
    return medObservables;
  }

}
