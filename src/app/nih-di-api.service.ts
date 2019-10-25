import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NihDiApiService {

  constructor(private http: HttpClient) { }

  fetchNIHResults(meds) {
    return meds
  }

}
