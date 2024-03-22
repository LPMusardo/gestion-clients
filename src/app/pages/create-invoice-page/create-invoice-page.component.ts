import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/api/invoices.service';
import { InvoiceStatus } from '../../types/invoiceStatus';

@Component({
  selector: 'app-create-invoice-page',
  template: `
    <div>
      <mat-card class="card">
        <mat-card-header>
          <div mat-card-avatar class="example-header-image"></div>
          <mat-card-title>Créer une facture</mat-card-title>
          <mat-card-subtitle></mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="content">
          <form (ngSubmit)="onSubmit()" [formGroup]="form">
            <mat-form-field class="input">
              <mat-label>Satut</mat-label>
              <select matNativeControl formControlName="status" name="status">
                <option [value]="invoiceStatus.SENT">Envoyé</option>
                <option [value]="invoiceStatus.PAID">Payé</option>
              </select>
            </mat-form-field>

            <mat-form-field class="input">
              <mat-label>Montant</mat-label>
              <input
                matInput
                formControlName="amount"
                type="number"
                name="amount"
                placeholder="Montant de la facture..."
              />
              <mat-error *ngIf="this.form.get('amount')?.invalid">
                "Veuillez remplir le montant correctement"
              </mat-error>
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button (click)="onSubmit()" mat-raised-button color="primary">
            Enregistrer la facture
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .input {
        width: 90%;
      }
      .card {
        margin: 150px auto;
        max-width: 400px;
      }
      .content {
        margin-bottom: 130px;
      }
    `,
  ],
})
export class CreateInvoicePageComponent {
  invoiceStatus = InvoiceStatus;
  customerId: number;
  errorMessage = '';

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
  }

  form = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    status: new FormControl(InvoiceStatus.SENT, [Validators.required]),
  });

  onSubmit() {
    console.log('Click on submit invoice button!');
    if (this.form.invalid || this.customerId == undefined) {
      console.log("Form is invalid, don't submit");
      return;
    }
    const newInvoice = {
      amount: Number(this.form.value.amount),
      client_id: this.customerId,
      status: this.form.value.status!,
    };
    this.invoiceService.addInvoice(newInvoice).subscribe({
      next: (invoice) => {
        console.log('invoice added sucessfully ', invoice);
        this.router.navigate([this.customerId]);
      },
      error: (error) => {
        console.error('Error while adding invoice', error);
        this.openSnackBar(error.message);
      },
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 5_000,
      panelClass: ['snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
