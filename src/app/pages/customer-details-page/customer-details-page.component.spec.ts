import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsPageComponent } from './customer-details-page.component';
import CustomerService from '../../services/api/customers.service';
import { HttpClient } from '@angular/common/http';
import { InvoiceService } from '../../services/api/invoices.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  mockActivatedRoute,
  mockCustomerService,
  mockInvoiceService,
  mockRouter,
} from '../../../test/mock';

describe('CustomerDetailsPageComponent', () => {
  let component: CustomerDetailsPageComponent;
  let fixture: ComponentFixture<CustomerDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: InvoiceService, useValue: mockInvoiceService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
      declarations: [CustomerDetailsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
