import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  //Declaration of variables
  public categoriesComponent : Array<categories> = [];
  
  //Services needed
  constructor(
    private readonly _categoriesService: CategoriesService
  ) { }

  //Function that search all the categories registered
  ngOnInit(): void {
    this._categoriesService.getCategories()
    .subscribe(
      (success)=>{
        this.categoriesComponent = success;
      },(error)=>{
        console.log(error)
      }
    );
  }

}
