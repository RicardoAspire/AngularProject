import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BillsService } from 'src/app/services/bills/bills.service';
import { of } from 'rxjs';
import { BillsComponent } from './bills.component';
import { BillsDetailsComponent } from '../bills-details/bills-details.component';
import { Router } from '@angular/router';

describe('BillsComponent', () => {
  let component: BillsComponent;
  let fixture: ComponentFixture<BillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path:'bills-details',component: BillsDetailsComponent}
        ])
      ],
      declarations:[
        BillsComponent
      ],
      providers:[
        FormBuilder,
        MatSnackBar,
        Overlay,
        BillsService
      ],
      schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Correct creation of a bill', () =>{
    const now = new Date()
    if(now.getMonth() < 10){
      var fullDate = now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+now.getDate()
    }else{
      var fullDate = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()
    }
    const fullHour = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    const form = {
      value :{
        description: "product", 
        cost: 123,
      },
      date: fullDate,
      time: fullHour,
    }
    const billsService = fixture.debugElement.injector.get(BillsService)
    const spy = spyOn(billsService,'createBill').and.returnValue(of())
    component.createBill(form)
    expect(spy).toHaveBeenCalled();

  });

  it('Correct routing',()=>{
    const router = TestBed.inject(Router);
    const spy = spyOn(router,'navigateByUrl');
    const form ={
      value:{
        startDate:0,
        endDate:0
      }
    } 
    component.searchByDates(form);
    expect(spy).toHaveBeenCalledOnceWith('/bills-details/0/0');
  });

  it('Desciption field is required',()=>{
    var descriptionField = component.billsForm.get('description');
    descriptionField!.setValue('');
    expect(descriptionField!.valid).toBeFalse()
  });

  it('Cost field is required',()=>{
    var descriptionField = component.billsForm.get('cost');
    descriptionField!.setValue('');
    expect(descriptionField!.valid).toBeFalse()
  });
});
