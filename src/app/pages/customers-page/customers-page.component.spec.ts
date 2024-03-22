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
import { CustomersPageComponent } from './customers-page.component';

describe('CustomersPageComponent', () => {
  let component: CustomersPageComponent;
  let fixture: ComponentFixture<CustomersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: InvoiceService, useValue: mockInvoiceService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [AppModule],
      declarations: [CustomersPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
