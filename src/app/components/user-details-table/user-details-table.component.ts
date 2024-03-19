import { Component, Input } from '@angular/core';
import { Observable, first, of } from 'rxjs';
import { Customer } from '../../types/customers';
import { Invoices } from '../../types/invoice';
import { InvoiceService } from '../../services/api/invoices.service';
import CustomerService from '../../services/api/customers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details-table',
  template: `<table
    mat-table
    [dataSource]="dataSource | async"
    class="mat-elevation-z8"
  >
    <ng-container matColumnDef="amount">
      <th mat-header-cell *matHeaderCellDef>Montant</th>
      <td mat-cell *matCellDef="let invoice">
        {{ invoice.amount }}
      </td>
    </ng-container>

    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef>Statut</th>
      <td mat-cell *matCellDef="let invoice">{{ invoice.status }}</td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>`,
})
export class UserDetailsTableComponent {
  displayedColumns: string[] = ['amount', 'status'];

  @Input()
  dataSource: Observable<any> = of([]);
}
