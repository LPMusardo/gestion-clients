import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersPageComponent } from './pages/customers-page/customers-page.component';
import { CustomerDetailsPageComponent } from './pages/customer-details-page/customer-details-page.component';
import { CreateCustomerPageComponent } from './pages/create-customer-page/create-customer-page.component';
import { CreateInvoicePageComponent } from './pages/create-invoice-page/create-invoice-page.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    CustomersPageComponent,
    CustomerDetailsPageComponent,
    CreateCustomerPageComponent,
    CreateInvoicePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatProgressSpinnerModule],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
