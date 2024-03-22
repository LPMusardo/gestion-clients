// src/app/api/tasks.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { FormInvoice } from '../../types/formInvoice';
import { Invoice, Invoices } from '../../types/invoice';
import { ServiceStatus } from '../../types/serviceStatus';
import { INVOICES_URL, SUPABASE_API_KEY } from './api';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {
    this.invoices$ = new BehaviorSubject<Invoices>([]);
    this.status$ = new BehaviorSubject<string>(ServiceStatus.DONE);
    console.log('CustomerService created');
  }

  private invoices$: BehaviorSubject<Invoices>;
  private status$: BehaviorSubject<string>;
  private customerInvoicesOwnerId: number = -1;

  private reloadInvoices(customerId: number): Observable<Invoices> {
    this.customerInvoicesOwnerId = customerId;
    this.status$.next(ServiceStatus.LOADING);
    return this.http
      .get<Invoices>(INVOICES_URL, {
        params: {
          client_id: `eq.${customerId}`,
        },
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
        tap((invoices) => {
          this.invoices$.next(invoices);
        })
      );
  }

  getInvoices(customerId: number): Observable<Invoices> {
    // if (this.customerInvoicesOwnerId !== customerId) {
    //   return this.reloadInvoices(customerId).pipe(
    //     switchMap(()=> this.invoices$.asObservable())
    //   )
    // }
    // return this.invoices$.asObservable();

    if (this.customerInvoicesOwnerId !== customerId) {
      this.reloadInvoices(customerId).subscribe();
    }
    return this.invoices$.asObservable();
  }

  addInvoice(newInvoice: FormInvoice): Observable<Invoice> {
    console.log('New invoice', newInvoice);
    this.status$.next(ServiceStatus.LOADING);
    return this.http
      .post<Invoice>(INVOICES_URL, newInvoice, {
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
          this.reloadInvoices(newInvoice.client_id).subscribe({
            error: (error) =>
              console.error('Error while loading all invoices', error),
          });
        })
      );
  }

  getStatus(): Observable<string> {
    return this.status$.asObservable();
  }
}
