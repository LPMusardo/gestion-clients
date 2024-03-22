import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Customer, Customers } from '../../types/customers';
import { FormCustomer } from '../../types/formCustomer';
import { ServiceStatus } from '../../types/serviceStatus';
import { CUSTOMERS_URL, SUPABASE_API_KEY } from './api';

@Injectable({
  providedIn: 'root',
})
export default class CustomerService {
  constructor(private http: HttpClient) {
    this.customers$ = new BehaviorSubject<Customers>([]);
    this.status$ = new BehaviorSubject<string>(ServiceStatus.DONE);
    this.reloadCustomers().subscribe({
      error: (error) =>
        console.error('Error while loading all customers', error),
    });
    console.log('CustomerService created');
  }

  private customers$: BehaviorSubject<Customers>;
  private status$: BehaviorSubject<string>;

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

  addCustomer(newCustomer: FormCustomer): Observable<Customer> {
    console.log('New customer', newCustomer);
    this.status$.next(ServiceStatus.LOADING);
    return this.http
      .post<Customer>(CUSTOMERS_URL, newCustomer, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: SUPABASE_API_KEY,
          Prefer: 'return=representation',
        },
      })
      .pipe(
        catchError((error) => {
          this.status$.next(ServiceStatus.ERROR);
          throw error;
        }),
        tap(() => {
          this.status$.next(ServiceStatus.DONE);
        }),
        tap(() => {
          this.reloadCustomers().subscribe({
            error: (error) =>
              console.error('Error while loading all customers', error),
          });
        })
      );
  }

  private reloadCustomers(): Observable<Customers> {
    this.status$.next(ServiceStatus.LOADING);
    return this.http
      .get<Customers>(CUSTOMERS_URL, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: SUPABASE_API_KEY,
        },
      })
      .pipe(
        catchError((error) => {
          this.status$.next(ServiceStatus.ERROR);
          throw error;
        }),
        tap(() => {
          this.status$.next(ServiceStatus.DONE);
        }),
        tap((customers) => this.customers$.next(customers))
      );
  }
}
