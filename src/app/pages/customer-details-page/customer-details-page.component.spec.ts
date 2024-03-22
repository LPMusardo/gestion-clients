import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import {
  mockActivatedRoute,
  mockCustomerService,
  mockInvoiceService,
  mockRouter,
} from '../../../test/mock';
import { AppModule } from '../../app.module';
import CustomerService from '../../services/api/customers.service';
import { InvoiceService } from '../../services/api/invoices.service';
import { CustomerDetailsPageComponent } from './customer-details-page.component';

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
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
