import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tablesOrders } from 'src/app/models/kitchen';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  //Declaration of variables
  orders: any;

  //Services needed
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productService: ProductsService,
    private _snackBar: MatSnackBar
  ) { }

  //Function that returns all the orders
  ngOnInit(): void {
    this.ordersService.getOrders()
      .subscribe(
        (success)=>{
          this.orders = success;
        },(error)=>{
          console.log(error)
        }
      )
  }

  //Function that change the state of a order
  orderReady(status: number, id: string){
    this.ordersService.changeStatus(status, id)
      .subscribe(
        (success)=>{
          this._snackBar.open('Status changed',undefined, {
            duration: 2000
          })
          this.ngOnInit();
        },(error)=>{  
          console.log(error)
        }
      )
  }
}
