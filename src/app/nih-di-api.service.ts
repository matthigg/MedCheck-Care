import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NihDiApiService {

  constructor() { }

  fetchNIHResults() {
    return { 'results': 'mock fetched' }
  }

}
