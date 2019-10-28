import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihRxcuiApiService {

  constructor(private http: HttpClient) { }

  // Send a request to the NIH RxCUI API with the intention of retrieving RxCUI
  // values for each medication name in a meds[] array.
  fetchRxCUIAPI(meds: string[]): {med: string, observable: Observable<object>}[] {
    const rxCUIObservables: {med: string, observable: Observable<object>}[] = [];
    meds.forEach(med => {
      if (med) {
        rxCUIObservables.push({
          'med': med,
          'observable': this.http.get('https://rxnav.nlm.nih.gov/REST/rxcui?name=' + med)
        });
      }
    });
    return rxCUIObservables;
  }
}
