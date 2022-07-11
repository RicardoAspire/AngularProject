import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CategoriesService } from './categories.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { categories } from 'src/app/models/categories';
import { product } from 'src/app/models/product';

const categories:Array<categories> = [
  {
    id: '1', 
    category_name: 'burguers'
  }
]   

const products:Array<product> = [
  {
    id: 1,
    category_id: 1, 
    name: 'bacon', 
    description: 'burger with bacon',
    price: 25, 
    stock: 15
  }
]    
const id = '1';


describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[CategoriesService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([CategoriesService], (service: CategoriesService) => {
    expect(service).toBeTruthy();
  }));
  
  it('DELETE category working and returning correct type of value',()=>{
    const categoriesTest = categories 
    service.deleteCategory(id).subscribe((resp:categories)=>{
      expect(resp).not.toBeNull();
    });

    const req = httpMock.expectOne('/api/category/'+id);
    expect(req.request.method).toBe('DELETE');
    req.flush(categories);
  });

  it('POST category working and returning correct type of value',()=>{
    const data:categories = {
      id: '1', 
      category_name: 'cakes'
    }
    service.createCategory(data).subscribe((resp:categories)=>{
      expect(resp).not.toBeUndefined();
    });
    const req = httpMock.expectOne('/api/category');
    expect(req.request.method).toBe('POST');
    req.flush(categories);
  });

  it('GET categories working and returning correct type of value',()=>{
    service.getCategories().subscribe((resp:categories[])=>{
      expect(resp).toEqual(categories);
    });
    const req = httpMock.expectOne('/api/categories');
    expect(req.request.method).toBe('GET');
    req.flush(categories);
  });

  it('GET category by id working and returning correct type of value',()=>{
    service.getCategory(id).subscribe((resp:categories[])=>{
      expect(resp).toEqual(categories);
    });
    const req = httpMock.expectOne('/api/category/'+id);
    expect(req.request.method).toBe('GET');
    req.flush(categories);
  });

  it('GET products by category working and returning correct type of value',()=>{
    service.getMenu(id).subscribe((resp:product[])=>{
      expect(resp).toEqual(products);
    });
    const req = httpMock.expectOne('/api/products-category/'+id);
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });

}); 