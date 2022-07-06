import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillsService } from 'src/app/services/bills/bills.service';

@Component({
  selector: 'app-bills-details',
  templateUrl: './bills-details.component.html',
  styleUrls: ['./bills-details.component.css']
})
export class BillsDetailsComponent implements OnInit {
  //Declaration of variables and Input values
  @Input() public startDate !: string;
  @Input() public endDate !: string;
  allBills: Array<any> =[];

  //Services needed
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly billsService: BillsService
  ) { 
    this.activatedRoute.params.subscribe( params => {
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    })
  }

  //Function that returns all the bills registered between two dates
  ngOnInit(): void {
    this.billsService.getBillsByDate(this.startDate, this.endDate)
    .subscribe(
      (success)=>{
        this.allBills = success;
      },(error)=>{
        console.log(error);
      }
    )
  }

}
