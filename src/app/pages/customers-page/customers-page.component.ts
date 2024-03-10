import { Component, OnInit } from '@angular/core';
import CustomerService from '../../api/customers.service';
import { Observable } from 'rxjs';
import { Customers } from '../../types/customers';

@Component({
  selector: 'app-clients-page',
  template: `
    <div>
      <h1>Liste des clients</h1>
      <button>Créer un client</button>

      <mat-progress-spinner
        *ngIf="(status$ | async) === 'LOADING'"
        mode="indeterminate"
      ></mat-progress-spinner>

      <table>
        <thead>
          <tr>
            <th>Nom complet</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers$ | async">
            <td>{{ customer.fullname }}</td>
            <td>{{ customer.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class CustomersPageComponent implements OnInit {
  public customers$: Observable<Customers>;
  public status$: Observable<string>;

  constructor(private customerService: CustomerService) {
    ({ customers$: this.customers$, status$: this.status$ } =
      this.customerService.getCustomersWithSatus());
  }
  ngOnInit(): void {}
}
