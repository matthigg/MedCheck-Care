import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihApproxTermService {

  // Number of approximate terms to return
  maxEntries: number = 4;

  constructor(private http: HttpClient) { }

  // Request a number of type-ahead approximate terms/suggestions to show uers 
  // when searching for medications in the Drug Interactions component form.
  fetchATAPI(userInput: string): Observable<any> {
    return this.http.get('https://rxnav.nlm.nih.gov/REST/approximateTerm?term=' + userInput + '&maxEntries=' + this.maxEntries)
  }
}
