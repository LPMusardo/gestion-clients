import { Component, OnInit } from '@angular/core';
import CustomerService from '../../services/api/customers.service';
import { Observable, filter, map, startWith, switchMap } from 'rxjs';
import { Customers } from '../../types/customers';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup } from '@angular/forms';
import SearchService from '../../services/search/search.service';

@Component({
  selector: 'app-clients-page',
  template: `
    <div class="container">
      <div *ngIf="(status$ | async) === 'DONE'">
        <header>
          <h1>Liste des clients</h1>
        </header>
        <div class="actions">
          <button mat-raised-button (click)="handleCreateCustomer()">
            Créer un client
          </button>

          <form [formGroup]="searchForm">
            <mat-form-field class="input">
              <mat-label>Chercher un client</mat-label>
              <input
                matInput
                formControlName="search"
                type="text"
                name="search"
                placeholder="search..."
              />
              <mat-icon matPrefix>search</mat-icon>
            </mat-form-field>
          </form>
        </div>
        <app-users-table [dataSource]="filteredCustomers$"></app-users-table>
      </div>

      <app-custom-spinner [status]="status$"></app-custom-spinner>

      <p *ngIf="(status$ | async) === 'ERROR'">Il y a eu une erreur</p>
    </div>
  `,
  styles: [
    `
      button {
        height: 55px;
        margin-right: 10px;
      }
      header {
        text-align: center;
        margin-bottom: 40px;
      }
      .container {
        margin: 40px 40px;
      }
      .actions {
        display: flex;
        margin: 16px 8px;
      }
    `,
  ],
})
export class CustomersPageComponent {
  allCustomers$: Observable<Customers>;
  filteredCustomers$: Observable<Customers>;
  status$: Observable<string>;
  searchForm: FormGroup;
  search$: Observable<string>;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private searchService: SearchService
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
    this.status$ = this.customerService.getStatus();
    this.allCustomers$ = this.customerService.getCustomers();
    this.search$ = this.searchForm.get('search')!.valueChanges;
    this.filteredCustomers$ = searchService.filteredObservable(
      this.allCustomers$,
      this.search$,
      'fullname'
    );
  }

  handleCreateCustomer() {
    this.router.navigate(['/create']);
  }
}
