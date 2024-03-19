import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvoicePageComponent } from './create-invoice-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
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
import { CreateInvoiceFormComponent } from '../../components/create-invoice-form/create-invoice-form.component';

describe('CreateInvoicePageComponent', () => {
  let component: CreateInvoicePageComponent;
  let fixture: ComponentFixture<CreateInvoicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      declarations: [CreateInvoicePageComponent, CreateInvoiceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInvoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
