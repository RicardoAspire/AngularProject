import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newProduct, product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getProducts(): Observable<product[]>{
    return this.httpClient.get<product[]>('/api/products');
  }

  getProduct(id:any): Observable<any>{
    return this.httpClient.get<any>('/api/product/'+id);
  }

  createProduct(request: newProduct): Observable<newProduct>{
    const bodyRequest = {
      category_id: request.category_id,
      name: request.name, 
      description: request.description, 
      price: request.price, 
      stock: request.stock
    };
    console.log("BODY REQUEST",bodyRequest)
    return this.httpClient.post<newProduct>('/api/products',bodyRequest);
  }

  deleteProduct(id: number): Observable<any>{
    return this.httpClient.delete<any>('/api/product/'+id);
  }

  addStock(request: any, id: any): Observable<any>{
    const bodyRequest = {
      id: id,
      stock: request.stock
    }
    return this.httpClient.put<newProduct>('/api/product/'+id,bodyRequest);
  }
}
