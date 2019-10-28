import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NihApproximateMatchApiService {

  constructor() { }

  fetchApproxMatchAPI(event: KeyboardEvent): Observable<object> {
    return fromEvent(event.target, 'keyup')
  }

  // Implement here (in subscription)
  // const typeahead = fromEvent(searchBox, 'input').pipe(
  //   map((e: KeyboardEvent) => e.target.value),
  //   filter(text => text.length > 2),
  //   debounceTime(10),
  //   distinctUntilChanged(),
  //   switchMap(() => ajax('/api/endpoint'))
  // );

  // Implement in component
  // typeahead.subscribe(data => {
  //   // Handle the data from the API
  //  });

}
