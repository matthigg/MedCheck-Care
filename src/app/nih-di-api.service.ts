import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihDiApiService {

  constructor(private http: HttpClient) { }

  // Stitch together the URL for the NIH Drug Interactions API request, and 
  // then make request and return the observable.
  fetchDIAPI(meds: string[]): Observable<object> {
    const nihDiApiParamsArray = [];
    meds.forEach(med => {
      nihDiApiParamsArray.push(med);
    })
    return this.http.get('https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=' + nihDiApiParamsArray.join('+'));
  }
}