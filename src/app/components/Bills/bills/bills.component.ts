import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillsService } from 'src/app/services/bills/bills.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  //Declaration of variables and Form groups
  billsForm!: FormGroup;
  dateForm!: FormGroup;
  startDate!: string;

  //Services needed
  constructor(
    private readonly fb:FormBuilder,
    private readonly router: Router,
    private readonly billsService: BillsService,
    private _snackBar: MatSnackBar
  ) { }

  //Creation of the date and two form groups (bills form and date form)
  ngOnInit(): void {
    const now = new Date();
    if(now.getMonth() < 10){    
      this.startDate = now.getFullYear()+'-0'+(now.getMonth()+1)+'-'+now.getDate();
    }else{
      this.startDate = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
    }
    this.billsForm = this.fb.group({
      'description': new FormControl('',Validators.required),
      'cost': new FormControl('',Validators.required)
    });
    this.dateForm = this.fb.group({
      'startDate': new FormControl(''),
      'endDate': new FormControl('')
    });
  }
  
  //Function that creates a new bill with todays date and hour
  createBill(form:any){
    const now = new Date()
    if(now.getMonth() < 10){
      var fullDate = now.getFullYear()+"-0"+(now.getMonth()+1)+"-"+now.getDate()
    }else{
      var fullDate = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()
    }
    const fullHour = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
    const data = {
      description: form.value.description,
      cost: form.value.cost,
      date: fullDate,
      time: fullHour,
    }  
    this.billsService.createBill(data)
    .subscribe(
      (success)=>{
        this._snackBar.open('Bill created',undefined, {
          duration: 2000
        })
      },(error)=>{
        console.log(error)
      }
    ) 
  }

  //Function that redirects to bills-details component with the filter of the dates selected
  searchByDates(form:any){
    const startDateForm = form.value.startDate;
    const endDateForm = form.value.endDate;
    this.router.navigateByUrl('/bills-details/'+startDateForm+'/'+endDateForm);
  }
}
