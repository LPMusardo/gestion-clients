import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Customer, Customers } from '../types/customers';
import { CUSTOMERS_URL, SUPABASE_API_KEY } from './api';

@Injectable({
  providedIn: 'root',
})
export default class CustomerService {
  constructor(private http: HttpClient) {
    this.customers$ = new BehaviorSubject<Customers>([]);
    this.status$ = new BehaviorSubject<string>('OK');
    this.reloadCustomers();
    console.log('CustomerService created');
  }

  private customers$: BehaviorSubject<Customers>;
  private status$: BehaviorSubject<string>;

  getCustomersWithSatus(): {
    customers$: Observable<Customers>;
    status$: Observable<string>;
  } {
    return {
      customers$: this.customers$.asObservable(),
      status$: this.status$.asObservable(),
    };
  }

  getCustomers(): Observable<Customers> {
    return this.customers$.asObservable();
  }

  getStatus(): Observable<string> {
    return this.status$.asObservable();
  }

  reloadCustomers(): void {
    this.status$.next('LOADING');
    this.http
      .get<Customers>(CUSTOMERS_URL, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: SUPABASE_API_KEY,
        },
      })
      .pipe(
        tap(() => {
          this.status$.next('DONE');
        }),
        catchError((error) => {
          console.error('Error loading customers', error);
          this.status$.next('ERROR');
          return of([]);
        })
      )
      .subscribe((customers) => {
        this.customers$.next(customers);
      });
  }
}
