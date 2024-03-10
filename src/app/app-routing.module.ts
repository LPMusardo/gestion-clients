import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersPageComponent } from './pages/customers-page/customers-page.component';
import { CustomerDetailsPageComponent } from './pages/customer-details-page/customer-details-page.component';
import { CreateCustomerPageComponent } from './pages/create-customer-page/create-customer-page.component';
import { CreateInvoicePageComponent } from './pages/create-invoice-page/create-invoice-page.component';

const routes: Routes = [
  { path: '', component: CustomersPageComponent, pathMatch: 'full' },
  { path: 'create', component: CreateCustomerPageComponent, pathMatch: 'full' },
  {
    path: ':id/invoices/create',
    component: CreateInvoicePageComponent,
    pathMatch: 'full',
  },
  { path: ':id', component: CustomerDetailsPageComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
