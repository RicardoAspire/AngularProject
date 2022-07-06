import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from 'src/app/services/tickets/tickets.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  //Declarations, variables and Input values
  @Input() public startDate !: string;
  @Input() public endDate !: string;
  allTickets: Array<any> =[];

  //Services needed
  constructor(
    private activatedRoute: ActivatedRoute,
    private ticketsService: TicketsService
  ) { 
    this.activatedRoute.params.subscribe( params => {
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    })
  }

  //Function that filter tickets by dates
  ngOnInit(): void {
    this.ticketsService.getTicketsByDate(this.startDate, this.endDate)
      .subscribe(
        (success)=>{
          this.allTickets = success;
        },(error)=>{
          console.log(error);
        }
      )
  }

}
