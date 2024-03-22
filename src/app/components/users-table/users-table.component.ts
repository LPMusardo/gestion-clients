import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-users-table',
  template: `<table
    mat-table
    [dataSource]="dataSource | async"
    class="mat-elevation-z8"
  >
    <ng-container matColumnDef="fullName">
      <th mat-header-cell *matHeaderCellDef>Nom Complet</th>
      <td mat-cell *matCellDef="let customer">
        <a routerLink="/{{ customer.id }}" href="">
          {{ customer.fullname }}
        </a>
      </td>
    </ng-container>

    <ng-container matColumnDef="email">
      <th mat-header-cell *matHeaderCellDef>Email</th>
      <td mat-cell *matCellDef="let customer">{{ customer.email }}</td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>`,
})
export class UsersTableComponent {
  displayedColumns: string[] = ['fullName', 'email'];

  @Input()
  dataSource: Observable<any> = of([]);
}
