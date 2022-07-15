import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { TablesService } from 'src/app/services/tables/tables.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations:[
        MenuComponent
      ],
      providers: [
        CategoriesService,
        TablesService,
        OrdersService,
        FormBuilder,
        MatSnackBar,
        Overlay
      ],
      schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  
  xit('New order, product field is required',()=>{
    var orderField = component.orderForm.get('product_id');
    orderField!.setValue('');
    expect(orderField!.valid).toBeFalse()
  });

  xit('New order, amount field is required',()=>{
    var amountField = component.orderForm.get('amount');
    amountField!.setValue('');
    expect(amountField!.valid).toBeFalse()
  });

  xit('New order, table_id field is required',()=>{
    var tableField = component.orderForm.get('table_id');
    tableField!.setValue('');
    expect(tableField!.valid).toBeFalse()
  });
});