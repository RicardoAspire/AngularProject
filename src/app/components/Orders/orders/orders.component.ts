import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { table } from 'src/app/models/tables';
import { TablesService } from 'src/app/services/tables/tables.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  //Declaration of variables 
  tables!: Array<table>;

  //Services needed
  constructor(
    private readonly tablesService: TablesService,
    private readonly router: Router
  ) { }

  //Function that returns all the tables
  ngOnInit(): void {
    this.tablesService.getTables()
      .subscribe(
        (success)=>{
          this.tables = success;
          console.log("Las teibles",this.tables)
        },(error)=>{
          console.log(error)
        }
      )
  }
  
  //Function that redirects to order-details to check one specific table details with orders
  details(id: number){
    this.router.navigate(['orders-details/',id])
  } 

}
