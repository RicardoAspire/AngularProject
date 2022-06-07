import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BillsDetailsComponent } from './components/Bills/bills-details/bills-details.component';
import { BillsComponent } from './components/Bills/bills/bills.component';
import { CategoriesAdminComponent } from './components/Categories/categories-admin/categories-admin.component';
import { CategoriesComponent } from './components/Categories/categories/categories.component';
import { KitchenComponent } from './components/Kitchen/kitchen/kitchen.component';
import { MenuComponent } from './components/Menu/menu/menu.component';
import { OrderDetailsComponent } from './components/Orders/order-details/order-details.component';
import { OrdersComponent } from './components/Orders/orders/orders.component';
import { ProductsComponent } from './components/Products/products/products.component';
import { StockComponent } from './components/Products/stock/stock.component';
import { TablesComponent } from './components/Tables/tables/tables.component';
import { TicketDetailsComponent } from './components/Tickets/ticket-details/ticket-details.component';
import { TicketsComponent } from './components/Tickets/tickets/tickets.component';
import { UsersDetailsComponent } from './components/Users/users-details/users-details.component';
import { UsersComponent } from './components/Users/users/users.component';

const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'bills', component: BillsComponent},
  {path:'bills-details', component: BillsDetailsComponent},
  {path:'categories', component: CategoriesComponent},
  {path:'categories-admin', component: CategoriesAdminComponent},
  {path:'kitchen', component: KitchenComponent},
  {path:'menu/:categoryId', component: MenuComponent},
  {path:'orders', component: OrdersComponent},
  {path:'orders-details', component: OrderDetailsComponent},
  {path:'products', component: ProductsComponent},
  {path:'stock', component: StockComponent},
  {path:'tables', component: TablesComponent},
  {path:'tickets', component: TicketsComponent},
  {path:'tickets-details', component: TicketDetailsComponent},
  {path:'users', component: UsersComponent},
  {path:'user-details', component: UsersDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
