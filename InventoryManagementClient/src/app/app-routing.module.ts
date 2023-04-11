import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { CustomerViewComponent } from './components/customer/customer-view/customer-view.component';
import { InvoiceCreateComponent } from './components/invoice/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './components/invoice/invoice-edit/invoice-edit.component';
import { InvoiceViewComponent } from './components/invoice/invoice-view/invoice-view.component';
import { InvoiceDetailsComponent } from './components/invoice/invoice-details/invoice-details.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { NavbarComponent } from './components/shared/nav/navbar/navbar.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  //{path: '**', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'user-view', component: UserViewComponent, canActivate:[AuthenticationGuard]},

  {path: 'navbar', component: NavbarComponent, canActivate:[AuthenticationGuard]},
  {path: 'appComponent', component: AppComponent, canActivate:[AuthenticationGuard]},

  {path: 'product-view', component: ProductViewComponent, canActivate:[AuthenticationGuard]},
  {path: 'product-add', component: ProductCreateComponent, canActivate:[AuthenticationGuard]},
  {path: 'product-edit/:id', component: ProductUpdateComponent, canActivate:[AuthenticationGuard]},
  {path: 'product-details/:id', component: ProductDetailsComponent, canActivate:[AuthenticationGuard]},

  {path: 'customer-add', component: CustomerCreateComponent, canActivate:[AuthenticationGuard]},
  {path: 'customer-edit/:id', component: CustomerEditComponent, canActivate:[AuthenticationGuard]},
  {path: 'customer-view', component: CustomerViewComponent, canActivate:[AuthenticationGuard]},

  {path: 'invoice-create', component: InvoiceCreateComponent, canActivate:[AuthenticationGuard]},
  {path: 'invoice-edit/:id', component: InvoiceEditComponent, canActivate:[AuthenticationGuard]},
  {path: 'invoice-view', component: InvoiceViewComponent, canActivate:[AuthenticationGuard]},
  {path: 'invoice-details/:id', component: InvoiceDetailsComponent, canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
