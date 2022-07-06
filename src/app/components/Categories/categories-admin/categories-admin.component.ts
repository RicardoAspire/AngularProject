import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.css']
})
export class CategoriesAdminComponent implements OnInit {
  //Declaration of variables and Form groups
  categoryForm!: FormGroup;
  deleteCategoryForm!: FormGroup;
  public categories: Array<categories> = [];

  //Services needed
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  //Function that returns all the categories and creates the form groups needed, categoryForm and deleteCategoryForm
  ngOnInit(): void {
    this.categoriesService.getCategories()
    .subscribe(
      (success)=>{
        this.categories = success;
      },(error)=>{
        console.log(error);
      }
    ); 
    this.categoryForm = this.fb.group({
      'category_name': new FormControl('',Validators.required),
    });
    this.deleteCategoryForm = this.fb.group({
      'categoryId': new FormControl('')
    })
  }
  
  //Function that creates a new category with a message on a snackBar
  addCategory(form:any){
    let data ={
      category_name: form.value.category_name,
    }
    this.categoriesService.createCategory(data).subscribe((data)=>{
      this._snackBar.open('Category created',undefined, {
        duration: 2000
      })
      this.ngOnInit()
    });
  }

  //Function that deletes a category with a message on a snackBar
  deleteCategory(categoryId:string){
    const id = categoryId;
    console.log(id);
    this.categoriesService.deleteCategory(id).subscribe((data)=>{
      this._snackBar.open('Category deleted',undefined, {
        duration: 2000
      })
      this.ngOnInit()
    });
  }
}
