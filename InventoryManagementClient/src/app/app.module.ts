import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MaterialModule } from './modules/material/material.module';
import { NavbarComponent } from './components/shared/nav/navbar/navbar.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerViewComponent } from './components/customer/customer-view/customer-view.component';
import { InvoiceCreateComponent } from './components/invoice/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './components/invoice/invoice-edit/invoice-edit.component';
import { InvoiceViewComponent } from './components/invoice/invoice-view/invoice-view.component';
import { InvoiceDetailsComponent } from './components/invoice/invoice-details/invoice-details.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductDialogComponent } from './components/product/product-dialog/product-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    UserViewComponent,
    ProductViewComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ConfirmDialogComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    CustomerViewComponent,
    InvoiceCreateComponent,
    InvoiceEditComponent,
    InvoiceViewComponent,
    InvoiceDetailsComponent,
    ProductDetailsComponent,
    ProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtTokenInterceptor,
    multi: true
  },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
