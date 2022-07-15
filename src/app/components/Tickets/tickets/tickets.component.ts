import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  //Declaration, variables and FormGroups needed
  dateForm!: FormGroup;
  startDate!: string;

  //Services needed
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  //Function that creates today date and dateForm group
  ngOnInit(): void {
    const now = new Date();
    if(now.getMonth() < 10){    
      this.startDate = now.getFullYear()+'-0'+(now.getMonth()+1)+'-'+now.getDate();
    }else{
      this.startDate = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
    }
    this.dateForm = this.fb.group({
      'startDate': new FormControl(''),
      'endDate': new FormControl('')
    })
  }

  //Function that redirects to ticket-details component, so that component can filter the tickets by dates
  searchByDates(form:any){
    const startDateForm = form.value.startDate;
    const endDateForm = form.value.endDate;
    this.router.navigateByUrl('/ticket-details/'+startDateForm+'/'+endDateForm);
  }
}