import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TopnavComponent } from './components/topnav/topnav.component';
import { BillsComponent } from './components/Bills/bills/bills.component';
import { BillsDetailsComponent } from './components/Bills/bills-details/bills-details.component';
import { CategoriesAdminComponent } from './components/Categories/categories-admin/categories-admin.component';
import { KitchenComponent } from './components/Kitchen/kitchen/kitchen.component';
import { MenuComponent } from './components/Menu/menu/menu.component';
import { OrdersComponent } from './components/Orders/orders/orders.component';
import { OrderDetailsComponent } from './components/Orders/order-details/order-details.component';
import { ProductsComponent } from './components/Products/products/products.component';
import { StockComponent } from './components/Products/stock/stock.component';
import { TablesComponent } from './components/Tables/tables/tables.component';
import { TicketsComponent } from './components/Tickets/tickets/tickets.component';
import { TicketDetailsComponent } from './components/Tickets/ticket-details/ticket-details.component';
import { UsersDetailsComponent } from './components/Users/users-details/users-details.component';
import { CategoriesComponent } from './components/Categories/categories/categories.component';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt/';
import { TokenInterceptorService } from './services/auth/token-interceptor.service';
import { UsersComponent } from './components/Users/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TopnavComponent,
    BillsComponent,
    BillsDetailsComponent,
    CategoriesComponent,
    CategoriesAdminComponent,
    KitchenComponent,
    MenuComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ProductsComponent,
    StockComponent,
    TablesComponent,
    TicketsComponent,
    TicketDetailsComponent,
    UsersDetailsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [
    HttpClient,
    //JWT
    {provide: JWT_OPTIONS, useValue:JWT_OPTIONS },
    JwtHelperService,
    //Token Interceptor 
    { provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
