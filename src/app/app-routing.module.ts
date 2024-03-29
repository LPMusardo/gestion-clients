import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerPageComponent } from './pages/create-customer-page/create-customer-page.component';
import { CreateInvoicePageComponent } from './pages/create-invoice-page/create-invoice-page.component';
import { CustomerDetailsPageComponent } from './pages/customer-details-page/customer-details-page.component';
import { CustomersPageComponent } from './pages/customers-page/customers-page.component';

const routes: Routes = [
  { path: '', component: CustomersPageComponent, pathMatch: 'full' },
  { path: 'create', component: CreateCustomerPageComponent, pathMatch: 'full' },
  {
    path: ':id/invoices/add',
    component: CreateInvoicePageComponent,
    pathMatch: 'full',
  },
  { path: ':id', component: CustomerDetailsPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
