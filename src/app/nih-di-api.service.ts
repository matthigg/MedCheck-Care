import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihDiApiService {

  constructor() { }

  fetchNIHResults(): Observable<any> {
    return of(['di 1', 'di 2', 'di 3']);
  }

}
