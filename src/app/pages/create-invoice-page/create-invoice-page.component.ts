import { Component } from '@angular/core';
import { FormInvoice } from '../../types/formInvoice';
import { InvoiceService } from '../../services/api/invoices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
              <mat-select formControlName="status" name="status">
                <mat-option value="SENT">SENT</mat-option>
                <mat-option value="PAID">PAID</mat-option>
              </mat-select>
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
              <!-- <mat-error>{{ getErrorMessage() }}</mat-error> -->
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
  customerId: number;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
  }

  form = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    status: new FormControl('SENT', [Validators.required]),
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
      status: 'SENT',
    };
    this.invoiceService.addInvoice(newInvoice);
    this.router.navigate([this.customerId]);
  }
}
