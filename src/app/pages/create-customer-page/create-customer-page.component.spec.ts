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
import { CreateCustomerPageComponent } from './create-customer-page.component';

describe('CreateCustomerPageComponent', () => {
  let component: CreateCustomerPageComponent;
  let fixture: ComponentFixture<CreateCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCustomerPageComponent, CreateCustomerPageComponent],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: InvoiceService, useValue: mockInvoiceService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
