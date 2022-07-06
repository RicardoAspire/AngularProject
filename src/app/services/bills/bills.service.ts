import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bills, newBill } from 'src/app/models/bills';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getBillsByDate(startDate: string, endDate: string): Observable<bills[]>{
    return this.httpClient.get<bills[]>('/api/bills/startDate/'+startDate+'/endDate/'+endDate);
  }

  getBills(): Observable<bills[]>{
    return this.httpClient.get<bills[]>('/api/bills');
  }

  createBill(request: newBill): Observable<newBill>{
    const bodyRequest = {
      description: request.description,
      amount: request.cost, 
      date: request.date, 
      hour: request.time
    };
    return this.httpClient.post<newBill>('/api/bills',bodyRequest);
  }

}
