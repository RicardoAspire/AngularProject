import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newTable, table } from 'src/app/models/tables';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getTables(): Observable<table[]>{
    return this.httpClient.get<table[]>('/api/tables');
  }

  createTable(request: newTable): Observable<newTable>{
    const bodyRequest = {
      name: request.name,
      status: request.status,
      total: request.total
    }
    return this.httpClient.post<newTable>('/api/tables',bodyRequest);
  }

  deleteTable(id:number): Observable<number>{
    return this.httpClient.delete<number>('/api/tables/'+id);
  }
  
  setTableToEmpty(status: number, id: string):Observable<string>{
    const bodyRequest = {
      status: status
    }
    return this.httpClient.put<string>('/api/table-status/'+id, bodyRequest)
  }
}
