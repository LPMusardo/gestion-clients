import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerPageComponent } from './create-customer-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import {
  mockCustomerService,
  mockInvoiceService,
  mockActivatedRoute,
  mockRouter,
} from '../../../test/mock';
import CustomerService from '../../services/api/customers.service';
import { InvoiceService } from '../../services/api/invoices.service';
import { AppRoutingModule } from '../../app-routing.module';
import { CreateCustomerFormComponent } from '../../components/create-customer-form/create-customer-form.component';

describe('CreateCustomerPageComponent', () => {
  let component: CreateCustomerPageComponent;
  let fixture: ComponentFixture<CreateCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCustomerPageComponent, CreateCustomerFormComponent],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: InvoiceService, useValue: mockInvoiceService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
