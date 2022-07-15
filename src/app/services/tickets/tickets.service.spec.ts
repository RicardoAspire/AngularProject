import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TicketsService } from './tickets.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { newTicket, ticket } from 'src/app/models/tickets';

const startDate = '2022-06-23';
const endDate = '2022-06-24';
const tickets:Array<ticket>=[{
  id: 1,
  table_id: 2,
  date: '2022-06-22',
  hour: '17:08:11',
  total: 105,
}]

describe('TicketsService', () => {
  let service: TicketsService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[TicketsService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(TicketsService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', inject([TicketsService], (service: TicketsService) => {
    expect(service).toBeTruthy();
  }));

  it('GET tickets working and returning correct type of value',()=>{
    service.getTicketsByDate(startDate, endDate).subscribe((resp:ticket[])=>{
      expect(resp).toEqual(tickets);
    });
    const req = httpMock.expectOne('/api/tickets/startDate/'+startDate+'/endDate/'+endDate);
    expect(req.request.method).toBe('GET');
    req.flush(tickets);
  });

  it('GET all the tickets working and returning correct type of value',()=>{
    service.getTickets().subscribe((resp:ticket[])=>{
      expect(resp).toEqual(tickets);
    });
    const req = httpMock.expectOne('/api/tickets');
    expect(req.request.method).toBe('GET');
    req.flush(tickets);
  });

  it('POST new tickets working and returning correct type of value',()=>{
    const data:newTicket = {
      table_id: 2,
      date: '2022-06-22',
      hour: '17:08:11',
      total: 150,
    }
    service.createTicket(data).subscribe((resp:newTicket)=>{
      expect(resp).not.toBeUndefined();
    });
    const req = httpMock.expectOne('/api/tickets');
    expect(req.request.method).toBe('POST');
    req.flush(data);
  });
});