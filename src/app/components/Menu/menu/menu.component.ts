import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { categories } from 'src/app/models/categories';
import { order } from 'src/app/models/order';
import { product } from 'src/app/models/product';
import { table } from 'src/app/models/tables';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { TablesService } from 'src/app/services/tables/tables.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //Declaration of variables and Input values 
  @Input() categoryId !: number;
  orderForm!: FormGroup;
  public products: Array<product> = []; 
  public productSelected : any = {
    id: '',
    name: ''
  }
  public amount = 1;
  tables: Array<table> = [];
  orders: Array<order> = [];
  categorySelected: Array<categories> = [];

  //Services needed
  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly _categoriesService: CategoriesService,
    private readonly fb: FormBuilder,
    private readonly tablesService: TablesService,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private _snackBar: MatSnackBar
  ) { 
    this.activatedRoute.params.subscribe( params => {
      this._categoriesService.getCategory(params['categoryId']).subscribe((success)=>{this.categorySelected = success})
      this._categoriesService.getMenu(params['categoryId'])
      .subscribe(
        (success)=>{
          this.products = success;
          this.productSelected = {
            id: '',
            name: ''
          }
        },(error)=>{
          console.log(error);
        }
      );
    })
  }

  //Function that returns all the tables registered, and creates the form group for orderForm
  ngOnInit(): void {
    this.tablesService.getTables()
    .subscribe(
      (success)=>{
        this.tables = success;
      },(error)=>{
        console.log(error)
      }
    );
    this.orderForm = this.fb.group({
      'product_id': new FormControl('',Validators.required),
      'amount': new FormControl(1,Validators.required),
      'table_id': new FormControl('',Validators.required),
      'comments': new FormControl(''),
    });
  }

  //Function that saves a product
  addProduct(id:any, name:any){
    this.productSelected.id = id;
    this.productSelected.name = name;
  }

  //Function that creates an order and reduces the stock
  addOrder(form: any){
    var data = {
      table_id: parseInt(this.orderForm.value.table_id),
      product_id: parseInt(this.orderForm.value.product_id), 
      amount: parseInt(this.orderForm.value.amount), 
      status: "Pendient", 
      comments: this.orderForm.value.comments, 
      ticket_number: -1
    }
    this.productsService.getProduct(data.product_id)
    .subscribe(
      (res)=>{
        const newStock = {
          stock: res[0].stock-data.amount,
          id: data.product_id
        } 
        this.productsService.addStock(newStock,data.product_id).subscribe((data)=>{console.log(data)},(e)=>{console.log(e)})
      },(error)=>{
        console.log(error)
      })
    this.ordersService.createOrder(data).subscribe((data)=>{
      this._snackBar.open('Order created',undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
        duration: 2000
      })
      this.ngOnInit()
    })
    
  }
}