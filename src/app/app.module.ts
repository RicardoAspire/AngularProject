import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    UsersDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
