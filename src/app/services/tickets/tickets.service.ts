import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newTicket, ticket } from 'src/app/models/tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getTicketsByDate(startDate: string, endDate: string): Observable<ticket[]>{
    return this.httpClient.get<ticket[]>('/api/tickets/startDate/'+startDate+'/endDate/'+endDate);
  }

  getTickets(): Observable<ticket[]>{
    return this.httpClient.get<ticket[]>('/api/tickets');
  }

  createTicket(request: newTicket): Observable<newTicket>{
    const bodyRequest = {
      table_id: request.table_id,
      date: request.date, 
      hour: request.hour, 
      total: request.total
    };
    return this.httpClient.post<newTicket>('/api/tickets',bodyRequest);
  }

}
