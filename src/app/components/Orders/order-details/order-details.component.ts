import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { newTicket } from 'src/app/models/tickets';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { TablesService } from 'src/app/services/tables/tables.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  //Declaration of variables 
  orders: any;
  totalProducts: number = 0;
  total: number = 0;
  tableId: any;

  //Services needed
  constructor(
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService,
    private readonly tableService: TablesService,
    private readonly ticketsService: TicketsService,
    private _snackBar:MatSnackBar,
    private readonly router: Router
  ) { }

  //Function that calculates the data, amount and states for the order
  ngOnInit(): void {
    this.tableId = this.route.snapshot.paramMap.get('id');
    if(this.tableId){
    this.ordersService.getOrdersByTable(this.tableId)
    .subscribe(
      (success)=>{
        if(success.length){
          this.orders = success
          for(let i=0; i<this.orders.length; i++){
            this.totalProducts = this.totalProducts + this.orders[i].amount;
            this.total = this.total + (this.orders[i].amount * this.orders[i].price);
          }
          console.log("los pedidos",success)
        }
      },(error)=>{
        console.log(error)
      }
    )
   }
  }

  //Function that saves the order as payed with the date and hour, and change the state of the order and table
  saveCheck(){
    const now = new Date()
    if(now.getMonth() < 10){
      var fullDate = now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+now.getDate()
    }else{
      var fullDate = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()
    }
    const fullHour = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    const newTicket:newTicket = {
      table_id : this.tableId,
      date: fullDate,
      hour: fullHour,
      total: this.total
    } 
    this.ticketsService.createTicket(newTicket)
    .subscribe(
      (success)=>{
        this._snackBar.open('Ticket saved',undefined, {
          duration: 2000
        })
      },(error)=>{
        console.log(error);
      }
    )
    for(let i=0;i<this.orders.length;i++){
      this.orders[i].status = 2;
      this.ordersService.changeStatus(2,this.orders[i].id)
      .subscribe(
        (success)=>{
          this.tableService.setTableToEmpty(0,this.tableId).subscribe((success)=>{
            this.router.navigate(['orders/'])
          })
        },(error)=>{
          console.log(error)
        }
      )
    }
  }

}
