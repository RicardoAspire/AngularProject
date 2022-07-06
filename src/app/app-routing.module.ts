import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/guards/auth.guard';
import { RoleGuard } from './components/auth/guards/role.guard';
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
  {path:'', component: LoginComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'bills', component: BillsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'bills-details/:startDate/:endDate', component: BillsDetailsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'categories', component: CategoriesComponent, canActivate:[RoleGuard], data: {expectedRole: 'Waiter'}},
  {path:'categories-admin', component: CategoriesAdminComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'kitchen', component: KitchenComponent, canActivate:[RoleGuard], data: {expectedRole: 'Kitchen'}},
  {path:'menu/:categoryId', component: MenuComponent, canActivate:[RoleGuard], data: {expectedRole: 'Waiter'}},
  {path:'orders', component: OrdersComponent, canActivate:[RoleGuard], data: {expectedRole: 'Waiter'}},
  {path:'orders-details/:id', component: OrderDetailsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Waiter'}},
  {path:'products', component: ProductsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'stock', component: StockComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'tables', component: TablesComponent, canActivate:[RoleGuard], data: {expectedRole: 'Waiter'}},
  {path:'tickets', component: TicketsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'ticket-details/:startDate/:endDate', component: TicketDetailsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'users', component: UsersComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}},
  {path:'user-details', component: UsersDetailsComponent, canActivate:[RoleGuard], data: {expectedRole: 'Admin'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
