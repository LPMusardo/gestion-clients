// src/app/api/tasks.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Invoice, Invoices } from '../../types/invoice';
import { INVOICES_URL, SUPABASE_API_KEY } from './api';
import { FormInvoice } from '../../types/formInvoice';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {
    this.invoices$ = new BehaviorSubject<Invoices>([]);
    this.status$ = new BehaviorSubject<string>('DONE');
    console.log('CustomerService created');
  }

  private invoices$: BehaviorSubject<Invoices>;
  private status$: BehaviorSubject<string>;
  private customerInvoicesOwnerId: number = -1;

  reloadInvoices(customerId: number): void {
    this.customerInvoicesOwnerId = customerId;
    this.status$.next('LOADING');
    this.http
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
        tap(() => {
          this.status$.next('DONE');
        }),
        catchError((error) => {
          console.error(
            `Error loading invoices of customer: ${customerId}`,
            error
          );
          this.status$.next('ERROR');
          return of([]);
        })
      )
      .subscribe((invoices) => {
        this.invoices$.next(invoices);
      });
  }

  getInvoices(customerId: number): Observable<Invoices> {
    if (this.customerInvoicesOwnerId !== customerId) {
      this.reloadInvoices(customerId);
    }
    return this.invoices$.asObservable();
  }

  addInvoice(newInvoice: FormInvoice) {
    console.log('New invoice', newInvoice);
    this.status$.next('LOADING');
    return this.http
      .post<Invoice>(INVOICES_URL, newInvoice, {
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
          console.error('Error adding new Invoice', error);
          this.status$.next('ERROR');
          return of({} as Invoice);
        })
      )
      .subscribe(() => {
        this.reloadInvoices(newInvoice.client_id);
      });
  }

  getStatus(): Observable<string> {
    return this.status$.asObservable();
  }
}
