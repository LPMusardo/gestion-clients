import { Component } from '@angular/core';
import CustomerService from '../../services/api/customers.service';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormCustomer } from '../../types/formCustomer';

@Component({
  selector: 'app-create-client-page',
  template: `<div class="container">
    <mat-card class="card">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>Créer un client</mat-card-title>
        <mat-card-subtitle></mat-card-subtitle>
      </mat-card-header>
      <mat-card-content class="content">
        <form (ngSubmit)="onSubmit()" [formGroup]="form">
          <mat-form-field class="input">
            <mat-label>Nom complet</mat-label>
            <input
              matInput
              placeholder="Prénom Nom"
              formControlName="fullname"
              name="fullname"
            />
            <mat-icon matPrefix>sentiment_very_satisfied</mat-icon>
            <!-- <mat-error>{{ getErrorMessage() }}</mat-error> -->
          </mat-form-field>

          <mat-form-field class="input">
            <mat-label>Email</mat-label>
            <input
              matInput
              placeholder="email@example.com"
              formControlName="email"
              name="email"
            />
            <mat-icon matPrefix>email</mat-icon>
            <!-- <mat-error>{{ getErrorMessage() }}</mat-error> -->
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button (click)="onSubmit()" mat-raised-button color="primary">Enregistrer</button>
      </mat-card-actions>
    </mat-card>
  </div>`,
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
export class CreateCustomerPageComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  form = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    console.log('Click on submit button!');
    if (this.form.invalid) {
      console.log("Form is invalid, don't submit");
      return;
    }
    const newCustomer = this.form.value as FormCustomer;
    this.customerService.addCustomer(newCustomer);
    this.form.setValue({
      fullname: '',
      email: '',
    });
    this.router.navigate(['']);
  }
}
