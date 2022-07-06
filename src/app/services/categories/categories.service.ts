import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categories, newCategory } from 'src/app/models/categories';
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
  getCategory(id:string): Observable<categories[]>{
    return this.httpClient.get<categories[]>('/api/category/'+id);
  }
  getMenu(id:string): Observable<product[]>{
    return this.httpClient.get<product[]>('/api/products-category/'+id);
  }
  createCategory(request: newCategory): Observable<any>{
    const bodyRequest = {
      category_name: request.category_name
    };
    console.log(bodyRequest)
    return this.httpClient.post<newCategory>('/api/category',bodyRequest);
  }
  deleteCategory(id:any): Observable<any>{
    return this.httpClient.delete<product[]>('/api/category/'+id);
  }
}
