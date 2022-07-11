import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from './products.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { newProduct, product } from 'src/app/models/product';

const products:Array<product>=[{
  id: 1,
  category_id: 2, 
  name: 'Cheese burger', 
  description: 'Burger with too much cheese',
  price: 70, 
  stock: 21
}]
const newProd: newProduct ={
  category_id: 2, 
  name: 'Cheese burger', 
  description: 'Burger with too much cheese',
  price: 70, 
  stock: 21
}

const id = '1';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[ProductsService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ProductsService], (service: ProductsService) => {
    expect(service).toBeTruthy();
  }));

  it('GET Products working and returning correct type of value',()=>{
    service.getProducts().subscribe((resp:product[])=>{
      expect(resp).toEqual(products);
    });
    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });

  it('GET Product by id working and returning correct type of value',()=>{
    service.getProduct(id).subscribe((resp:any)=>{
      expect(resp).toEqual(products);
    });
    const req = httpMock.expectOne('/api/product/'+id);
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });

  it('POST to create products working and returning correct type of value',()=>{
    const data:newProduct ={
      category_id: 1, 
      name: 'chocolate cake', 
      description: 'cake with black chocolate',
      price: 150, 
      stock: 20
    }
    service.createProduct(data).subscribe((resp:newProduct)=>{
      expect(resp).toEqual(newProd);
    });
    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('POST');
    req.flush(newProd);
  });

  it('DELETE product working and returning correct type of value',()=>{
    const productsTest = products 
    service.deleteProduct(1).subscribe((resp:product)=>{
      expect(resp).not.toBeNull();
    });

    const req = httpMock.expectOne('/api/product/'+id);
    expect(req.request.method).toBe('DELETE');
    req.flush(productsTest);
  });

  it('PUT to change status working and returning correct type of value',()=>{
    service.addStock(1,'1').subscribe((resp:string)=>{
      expect(resp).not.toBeNull();
    });
    const req = httpMock.expectOne('/api/product/'+id);
    expect(req.request.method).toBe('PUT');
  });
});