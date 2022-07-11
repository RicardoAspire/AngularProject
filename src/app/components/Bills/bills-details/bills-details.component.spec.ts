import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BillsService } from 'src/app/services/bills/bills.service';

import { BillsDetailsComponent } from './bills-details.component';

describe('BillsDetailsComponent', () => {
  let component: BillsDetailsComponent;
  let fixture: ComponentFixture<BillsDetailsComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations:[
        BillsDetailsComponent
      ],
      providers:[
        BillsService,
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
