import { Component } from '@angular/core';
import CustomerService from '../../services/api/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, first } from 'rxjs';
import { Customer } from '../../types/customers';
import { InvoiceService } from '../../services/api/invoices.service';
import { Invoice, Invoices } from '../../types/invoice';

@Component({
  selector: 'app-client-details-page',
  template: `
    <div class="container">
      <ng-container
        *ngIf="(status$ | async) === 'DONE' && (customer$ | async) as customer"
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

      <div *ngIf="(status$ | async) === 'ERROR'">Il y a eu une erreur</div>
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
  public customer$: Observable<Customer | undefined>;
  public invoices$: Observable<Invoices>;
  public status$: Observable<string>;

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
    this.status$ = this.invvoiceService.getStatus();
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
