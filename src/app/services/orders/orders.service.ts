import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newOrder,order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getOrders(): Observable<order[]>{
    return this.httpClient.get<order[]>('/api/orders/table');
  }

  createOrder(request: newOrder): Observable<newOrder>{
    const bodyRequest = {
      table_id: request.table_id,
      product_id: request.product_id, 
      amount: request.amount, 
      status: request.status, 
      comments: request.comments, 
      ticket_number: request.ticket_number
    };
    return this.httpClient.post<newOrder>('/api/orders',bodyRequest);
  }

  changeStatus(status: number, id: string):Observable<string>{
    const bodyRequest = {
      status: status
    }
    return this.httpClient.put<string>('/api/orders/status/'+id, bodyRequest)
  }

  getOrdersByTable(id:string):Observable<order[]>{
    return this.httpClient.get<order[]>('/api/orders-by-table/'+id);
  }
}
