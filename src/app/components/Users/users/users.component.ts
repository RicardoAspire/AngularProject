import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //Declarations and variables
  public users: Array<UserI> = [];

  //Services needed
  constructor(
    private userService: UsersService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  //Function that returns all the users registered
  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe(
      (success)=>{
        this.users = success;
      },(error)=>{
        console.log(error);
      }
    )
  }

  //Function that redirects to user-details with one user id so you can check the details of that user
  details(id:number){
    this.sharedService.setUser(id);
    this.router.navigateByUrl('/user-details');
  }

}
