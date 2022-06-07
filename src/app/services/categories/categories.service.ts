import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categories } from 'src/app/models/categories';
import { product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getCategories(): Observable<categories[]>{
    return this.httpClient.get<categories[]>('/api/categories');
  }
  getMenu(id:string): Observable<product[]>{
    return this.httpClient.get<product[]>('/api/products-category/'+id);
  }
}
