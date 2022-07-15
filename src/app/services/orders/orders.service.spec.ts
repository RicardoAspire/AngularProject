import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OrdersService } from './orders.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { newOrder, order } from 'src/app/models/order';

const orders:Array<order> = [
  {
    id: 1, 
    table_id: 2,
    product_id: 1, 
    amount: 25, 
    status: 'ready', 
    comments: 'No ketchup', 
    ticket_number: 1
  }
]   
const id = '2';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers:[OrdersService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', inject([OrdersService], (service: OrdersService) => {
    expect(service).toBeTruthy();
  }));

  it('GET Orders working and returning correct type of value',()=>{
    service.getOrders().subscribe((resp:order[])=>{
      expect(resp).toEqual(orders);
    });
    const req = httpMock.expectOne('/api/orders/table');
    expect(req.request.method).toBe('GET');
    req.flush(orders);
  });

  it('GET Orders by table working and returning correct type of value',()=>{
    service.getOrdersByTable('2').subscribe((resp:order[])=>{
      expect(resp).toEqual(orders);
    });
    const req = httpMock.expectOne('/api/orders-by-table/'+id);
    expect(req.request.method).toBe('GET');
    req.flush(orders);
  });

  it('PUT to change status working and returning correct type of value',()=>{
    service.changeStatus(1,'2').subscribe((resp:string)=>{
      expect(resp).not.toBeNull();
    });
    const req = httpMock.expectOne('/api/orders/status/'+id);
    expect(req.request.method).toBe('PUT');
    req.flush(orders);
  });

  it('POST to create orders working and returning correct type of value',()=>{
    const data:newOrder = {
      table_id: 2,
      product_id: 1, 
      amount: 56, 
      status: 'ready', 
      comments: 'No mustard', 
      ticket_number: 2
    }
    service.createOrder(data).subscribe((resp:newOrder)=>{
      expect(resp).not.toBeUndefined();
    });
    const req = httpMock.expectOne('/api/orders');
    expect(req.request.method).toBe('POST');
    req.flush(data);
  });
});