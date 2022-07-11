import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BillsService } from './bills.service';
import { bills, newBill } from 'src/app/models/bills';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

const billsList:Array<bills> =[ 
  {
    id: 0,
    description:'', 
    cost: 2.00, 
    date: '2022-06-23', 
    time: '2022-06-24',
  }
]
const startDate= '0'; 
const endDate= '0';

describe('BillsService', () => {
  let service: BillsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[BillsService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(BillsService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([BillsService], (service: BillsService) => {
    expect(service).toBeTruthy();
  }));
  
  it('GET method working and returning correct type of value',()=>{
    service.getBills().subscribe((resp:bills[])=>{
      expect(resp).toEqual(billsList);
    });
    const req = httpMock.expectOne('/api/bills');
    expect(req.request.method).toBe('GET');
    req.flush(billsList);
  });

  it('GET by date working and returning correct type of value',()=>{
    service.getBillsByDate(startDate,endDate).subscribe((resp:bills[])=>{
      expect(resp).toEqual(billsList);
    });
    const req = httpMock.expectOne('/api/bills/startDate/'+startDate+'/endDate/'+endDate);
    expect(req.request.method).toBe('GET');
    req.flush(billsList);
  });

  it('POST bills working and returning correct type of value',()=>{
    const data:newBill = {
      description: 'description',
      cost: 100, 
      date: '2022-06-23', 
      time: '18:30:02'
    }
    service.createBill(data).subscribe((resp:newBill)=>{
      expect(resp).not.toBeUndefined();
    });
    const req = httpMock.expectOne('/api/bills');
    expect(req.request.method).toBe('POST');
    req.flush(billsList);
  });
});