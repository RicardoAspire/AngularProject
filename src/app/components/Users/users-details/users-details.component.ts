import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserI,UserDB } from 'src/app/models/user';
import { SharedService } from 'src/app/services/shared/shared.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  //Declarations, variables and viewChilds needed
  @ViewChild('userForm') userForm?:NgForm;
  user : UserDB = {
    id:0,
    userName: '',
    password: '',
    role: '',
    dateTime: '',
    updateTime: ''
  };
  role = ['Admin','Kitchen','Waiter'];
  showPassword: boolean = false;
  public users:Array<any> =[];

  //Services needed
  constructor(
    private readonly sharedService: SharedService,
    private readonly userService: UsersService,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) { } 

  //Function that returns the details of one single user
  ngOnInit(): void {
    const id = this.sharedService.getUser().toString();
    if(id != '0'){
      this.userService.getUser(id)
      .subscribe(
        (success)=>{
          this.user = success[0];
          console.log("EL USER ",this.user); 
        },(error)=>{
          console.log(error)
        }
      );
    }else{
      this.router.navigateByUrl('/users');
    }
    this.userService.getUsers()
    .subscribe(
      (success)=>{
        this.users = success;
      },(error)=>{
        console.log(error);
      }
    )
  }

  //Function that changes the status the password field
  showHidePassword() {
    this.showPassword = !this.showPassword;
  } 

  //Function that updates the user data
  updateUser(){
    if(!this.users.find(e=>e.userName === this.user.userName)){
      this.userService.updateUser(this.user.id,this.user)
      .subscribe(
        (success)=>{
          this._snackBar.open('User updated',undefined, {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
            duration: 2000
          })
          this.router.navigateByUrl('/users');
        },(error)=>{
          console.log(error);
        }
      )
    }else{
      this._snackBar.open('The user already exists',undefined, {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
        duration: 2000
      })
    }
  }

}
