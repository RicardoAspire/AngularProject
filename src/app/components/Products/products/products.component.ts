import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { categories } from 'src/app/models/categories';
import { product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //Declaration of variables and Form groups
  productForm!: FormGroup;
  deleteProductForm!: FormGroup;
  public categories: Array<categories> = [];
  public products: Array<product> = [];

  //Services needed
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  //Function that returns all the products, categories, and creates the two form groups needed, productForm and deleteProductForm
  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe(
      (success)=>{
        this.products = success;
      },(error)=>{
        console.log(error);
      }
    );
    this.categoriesService.getCategories()
    .subscribe(
      (success)=>{
        this.categories = success;
      },(error)=>{
        console.log(error);
      }
    ); 
    this.productForm = this.fb.group({
      'name': new FormControl('',Validators.required),
      'description': new FormControl('',Validators.required),
      'category_id': new FormControl('',Validators.required),
      'price': new FormControl('',Validators.required),
      'stock': new FormControl('',Validators.required),
    });
    this.deleteProductForm = this.fb.group({
      'productId': new FormControl('',Validators.required)
    })
  }

  //Function that creates a new product
  addProduct(form:any){
    let data ={
      category_id: parseInt(form.value.category_id),
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      stock: form.value.stock
    }
    this.productsService.createProduct(data).subscribe((data)=>{
      this._snackBar.open('Product created',undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
        duration: 2000
      })
      this.ngOnInit()
    });
  }

  //Function that deletes a product
  deleteProduct(form:any){
    const id = form.value.productId;
    console.log(id);
    this.productsService.deleteProduct(id).subscribe((data)=>{
      this._snackBar.open('Product deleted',undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
        duration: 2000
      })
      this.ngOnInit()
    });
  }
}
