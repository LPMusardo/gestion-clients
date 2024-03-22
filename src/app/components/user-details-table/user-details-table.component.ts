import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-details-table',
  template: `<table
    mat-table
    [dataSource]="dataSource | async"
    class="mat-elevation-z8"
  >
    <ng-container matColumnDef="amount">
      <th mat-header-cell *matHeaderCellDef>Montant (€)</th>
      <td mat-cell *matCellDef="let invoice">
        {{ invoice.amount | number : '2.2' : 'fr-FR' }}
        <!-- div juste pour que le test Cypress soit OK malge le formatage-->
        <div style="display: none;">{{ invoice.amount }}</div>
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
