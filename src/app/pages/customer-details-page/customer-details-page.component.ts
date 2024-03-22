import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, first, map } from 'rxjs';
import CustomerService from '../../services/api/customers.service';
import { InvoiceService } from '../../services/api/invoices.service';
import { Customer } from '../../types/customers';
import { Invoices } from '../../types/invoice';
import { ServiceStatus } from '../../types/serviceStatus';

@Component({
  selector: 'app-client-details-page',
  template: `
    <div class="container">
      <ng-container
        *ngIf="
          (status$ | async) === serviceStatus.DONE &&
          (customer$ | async) as customer
        "
      >
        <header>
          <h1>{{ customer.fullname }}</h1>
          <h2>{{ customer.email }}</h2>
        </header>
        <div class="actions">
          <button mat-raised-button (click)="handleHomePageClick()">
            Retour aux clients
          </button>
          <button mat-raised-button (click)="handleCreateInvoice()">
            Créer une facture
          </button>
        </div>
        <app-user-details-table [dataSource]="invoices$">
        </app-user-details-table>
      </ng-container>

      <app-custom-spinner [status]="status$"></app-custom-spinner>

      <div *ngIf="(status$ | async) === serviceStatus.ERROR">
        Il y a eu une erreur
      </div>
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
        padding-bottom: 10px;
      }
    `,
  ],
})
export class CustomerDetailsPageComponent {
  serviceStatus = ServiceStatus;

  customer$: Observable<Customer | undefined>;
  invoices$: Observable<Invoices>;
  status$: Observable<string>;

  constructor(
    private invvoiceService: InvoiceService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const customerId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('The page show the customer ', customerId);
    this.customer$ = this.customerService.getOneCustomer(customerId);
    this.invoices$ = this.invvoiceService.getInvoices(customerId);
    this.status$ = combineLatest([
      this.customerService.getStatus(),
      this.invvoiceService.getStatus(),
    ]).pipe(
      map(([s1, s2]) => {
        if (s1 === ServiceStatus.LOADING || s2 === ServiceStatus.LOADING)
          return ServiceStatus.LOADING;
        if (s1 === ServiceStatus.ERROR || s2 === ServiceStatus.ERROR)
          return ServiceStatus.ERROR;
        return ServiceStatus.DONE;
      })
    );
  }

  ngOnInit(): void {}

  handleHomePageClick() {
    console.log('Back Home page button clicked!');
    this.router.navigate(['']);
  }

  handleCreateInvoice() {
    console.log('Create invoice button clicked!');
    let customer: Customer | undefined;
    this.customer$.pipe(first()).subscribe((c) => {
      customer = c;
    });
    if (customer == undefined) return;
    this.router.navigate([customer.id, 'invoices', 'add']);
  }
}
