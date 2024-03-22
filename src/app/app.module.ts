import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { UserDetailsTableComponent } from './components/user-details-table/user-details-table.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { CreateCustomerPageComponent } from './pages/create-customer-page/create-customer-page.component';
import { CreateInvoicePageComponent } from './pages/create-invoice-page/create-invoice-page.component';
import { CustomerDetailsPageComponent } from './pages/customer-details-page/customer-details-page.component';
import { CustomersPageComponent } from './pages/customers-page/customers-page.component';

registerLocaleData(localeFr);

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
    MatFormFieldModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
