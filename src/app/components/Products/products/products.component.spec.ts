import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      declarations:[
        ProductsComponent
      ],
      providers: [
        ProductsService,
        CategoriesService,
        FormBuilder,
        MatSnackBar,
        Overlay,
      ],
      schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('New product, name field is required',()=>{
    var nameeField = component.productForm.get('name');
    nameeField!.setValue('');
    expect(nameeField!.valid).toBeFalse()
  });

  it('New product, description field is required',()=>{
    var descriptionField = component.productForm.get('description');
    descriptionField!.setValue('');
    expect(descriptionField!.valid).toBeFalse()
  });

  it('New product, category field is required',()=>{
    var categoryField = component.productForm.get('category_id');
    categoryField!.setValue('');
    expect(categoryField!.valid).toBeFalse()
  });
  
  it('New product, price field is required',()=>{
    var priceField = component.productForm.get('price');
    priceField!.setValue('');
    expect(priceField!.valid).toBeFalse()
  });

  it('New product, stock field is required',()=>{
    var stockField = component.productForm.get('stock');
    stockField!.setValue('');
    expect(stockField!.valid).toBeFalse()
  });

  it('New product, productId field is required',()=>{
    var productField = component.deleteProductForm.get('productId');
    productField!.setValue('');
    expect(productField!.valid).toBeFalse()
  });
});
