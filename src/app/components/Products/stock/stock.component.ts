import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { categories } from 'src/app/models/categories';
import { product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  //Variables, declarations, form groups and view childs needed
  products : any;
  stockForm!: FormGroup;
  categories: Array<categories> = [];
  productToChange: product = {
    id: 0,
    category_id: 0, 
    name: '', 
    description: '',
    price: 0, 
    stock: 0
  }; 
  @ViewChild('categorySelected') categorySelected!:ElementRef;
  @ViewChild('productSelected') productSelected!:ElementRef;

  //Services needed
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) { }

  //Function that returns all the categories and creates the stockForm group
  ngOnInit(): void {
      this.categoriesService.getCategories()
      .subscribe(
        (success)=>{
          this.categories = success;
          console.log(success)
        },(error)=>{
          console.log(error)
        }
      )
    this.stockForm = this.fb.group({
      'stock_amount': new FormControl('',Validators.required),
    });
  }

  //Function that changes the stock of a product
  addStock(form: any, id: any, stock: any){
    const data = {
      stock: stock + form.value.stock_amount,
      id: id
    }
    this.productsService.addStock(data, id).subscribe(
      (success)=>{
        this._snackBar.open('Stock added',undefined, {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success'],
          duration: 2000
        })
        this.ngOnInit();
        this.productToChange = {
          id: 0,
          category_id: 0, 
          name: '', 
          description: '',
          price: 0, 
          stock: 0
        };
      },(error)=>{
        console.log(error);
      }
    );
  }

  //Function that filters all the products from a category
  productsFromCategory(){
    let category = this.categorySelected.nativeElement.value;
    this.categoriesService.getMenu(category)
    .subscribe(
      (success)=>{
        this.products = success;
      },(error)=>{
        console.log(error);
      }
    )
  }

  //Function that filters a product from a list of products
  productToRestock(){
    let product = this.productSelected.nativeElement.value;
    this.productsService.getProduct(product)
    .subscribe(
      (success)=>{
        this.productToChange = success[0];
      },(error)=>{
        console.log(error);
      }
    )
  }
}
