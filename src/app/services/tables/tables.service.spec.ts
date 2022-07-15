import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TablesService } from 'src/app/services/tables/tables.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { newTable, table } from 'src/app/models/tables';

const tables:Array<table>=[{
  id: 1, 
  name: 'Table 1', 
  status: 'Free', 
  total: 0
}]
const newTables:newTable={
  name: 'Table 1', 
  status: 0, 
  total: 0
}
const id = '1';

describe('TablesService', () => {
  let service: TablesService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[TablesService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(TablesService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', inject([TablesService], (service: TablesService) => {
    expect(service).toBeTruthy();
  }));


  it('GET tables working and returning correct type of value',()=>{
    service.getTables().subscribe((resp:table[])=>{
      expect(resp).toEqual(tables);
    });
    const req = httpMock.expectOne('/api/tables');
    expect(req.request.method).toBe('GET');
    req.flush(tables);
  });

  it('POST to tables working and returning correct type of value',()=>{
    const data:newTable = {
      name: 'Table 2', 
      status: 1, 
      total: 0
    }
    service.createTable(data).subscribe((resp:newTable)=>{
      expect(resp).not.toBeUndefined();
    });
    const req = httpMock.expectOne('/api/tables');
    expect(req.request.method).toBe('POST');
    req.flush(data);
  });

  it('DELETE tables working and returning correct type of value',()=>{
    service.deleteTable(1).subscribe((resp:number)=>{
      expect(resp).not.toBeNull();
    });

    const req = httpMock.expectOne('/api/tables/'+id);
    expect(req.request.method).toBe('DELETE');
    req.flush(tables);
  });

  it('PUT table to empty working and returning correct type of value',()=>{
    service.setTableToEmpty(1,'1').subscribe((resp:string)=>{
      expect(resp).not.toBeNull();
    });
    const req = httpMock.expectOne('/api/table-status/'+id);
    expect(req.request.method).toBe('PUT');
  });
});