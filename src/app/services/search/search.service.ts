import { Injectable } from '@angular/core';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class SearchService {
  filteredObservable<T>(
    allElements$: Observable<T[]>,
    searchInput$: Observable<string>,
    elementField: string
  ): Observable<T[]> {
    return searchInput$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      startWith(''),
      switchMap((search) =>
        allElements$.pipe(
          map((customers) =>
            customers.filter((c: any) =>
              (c[elementField] as string)
                .toLowerCase()
                .includes(search.toLowerCase())
            )
          )
        )
      )
    );
  }
}
