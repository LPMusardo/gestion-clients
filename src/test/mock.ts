import { Observable } from 'rxjs';
import { Customers } from '../app/types/customers';

export let mockCustomerService = jasmine.createSpyObj('CustomerService', [
  'getOneCustomer',
  'getCustomers',
  'getCustomersWithSatus',
  'getStatus',
  'addCustomer',
  'reloadCustomers',
]);
mockCustomerService.getCustomersWithSatus.and.returnValue(
  {} as {
    customers$: Observable<Customers>;
    status$: Observable<string>;
  }
);

export let mockInvoiceService = jasmine.createSpyObj('InvoiceService', [
  'reloadInvoices',
  'getInvoices',
  'addInvoice',
  'getStatus',
]);

export let mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [
  'snapshot',
]);
mockActivatedRoute.snapshot.paramMap = jasmine.createSpyObj('paramMap', [
  'get',
]);
mockActivatedRoute.snapshot.paramMap.get.and.returnValue('1');

export let mockRouter = jasmine.createSpyObj('Router', ['navigate']);
