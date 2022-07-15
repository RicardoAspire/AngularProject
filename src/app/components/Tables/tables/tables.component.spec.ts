import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TablesService } from 'src/app/services/tables/tables.service';

import { TablesComponent } from './tables.component';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      declarations:[
        TablesComponent
      ],
      providers: [
        TablesService,
        FormBuilder,
        MatSnackBar,
        Overlay
      ],
      schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Table name field is required',()=>{
    var tableField = component.tablesForm.get('table_name');
    tableField!.setValue('');
    expect(tableField!.valid).toBeFalse()
  });

  it('Table id to delete field is required',()=>{
    var tableField = component.deleteTableForm.get('tableId');
    tableField!.setValue('');
    expect(tableField!.valid).toBeFalse()
  });
});
