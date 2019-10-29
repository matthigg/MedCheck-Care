import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NihPropertiesApiService {

  constructor(private http: HttpClient) { }

  // Take an array of RxCUI numbers and return an array of NIH Property 
  // API observables.
  fetchPropertiesAPI(rxcuiNumbers: string[]): Observable<Object>[] {
    const propertyObservables: Observable<Object>[] = [];
    rxcuiNumbers.forEach(rxcuiNumber => {
      propertyObservables.push(this.http.get('https://rxnav.nlm.nih.gov/REST/rxcui/' + rxcuiNumber + '/properties'))
    })
    return propertyObservables;
  }
}
