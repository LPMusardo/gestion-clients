import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Customer, Customers } from '../../types/customers';
import { CUSTOMERS_URL, SUPABASE_API_KEY } from './api';
import { FormCustomer } from '../../types/formCustomer';

@Injectable({
  providedIn: 'root',
})
export default class CustomerService {
  constructor(private http: HttpClient) {
    this.customers$ = new BehaviorSubject<Customers>([]);
    this.status$ = new BehaviorSubject<string>('DONE');
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

  getOneCustomer(id: number): Observable<Customer | undefined> {
    return this.customers$.pipe(
      map((customers) => customers.find((customer) => customer.id === id))
    );
  }

  getStatus(): Observable<string> {
    return this.status$.asObservable();
  }

  addCustomer(newCustomer: FormCustomer) {
    console.log('New customer', newCustomer);
    this.status$.next('LOADING');
    return this.http
      .post<Customer>(CUSTOMERS_URL, newCustomer, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: SUPABASE_API_KEY,
          Prefer: 'return=representation',
        },
      })
      .pipe(
        tap(() => {
          this.status$.next('DONE');
        }),
        catchError((error) => {
          console.error('Error adding customer', error);
          this.status$.next('ERROR');
          return of({} as Customer);
        })
      )
      .subscribe(() => {
        this.reloadCustomers();
      });
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
