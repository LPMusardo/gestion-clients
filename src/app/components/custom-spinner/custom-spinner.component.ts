import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceStatus } from '../../types/serviceStatus';

@Component({
  selector: 'app-custom-spinner',
  template: `
    <mat-progress-spinner
      class="center"
      *ngIf="(status | async) === serviceStatus.LOADING"
      mode="indeterminate"
    >
    </mat-progress-spinner>
  `,
  styles: [
    `
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `,
  ],
})
export class CustomSpinnerComponent {
  serviceStatus = ServiceStatus;

  @Input()
  status: Observable<string> = of(ServiceStatus.DONE);
}
