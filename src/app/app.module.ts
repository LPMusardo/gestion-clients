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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MatTableModule } from '@angular/material/table';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { UserDetailsTableComponent } from './components/user-details-table/user-details-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersPageComponent,
    CustomerDetailsPageComponent,
    CreateCustomerPageComponent,
    CreateInvoicePageComponent,
    UsersTableComponent,
    CustomSpinnerComponent,
    UserDetailsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
