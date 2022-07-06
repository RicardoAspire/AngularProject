import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //Declaration of variables, array of roles
  role = ['Admin','Kitchen','Waiter'];

  //Services needed
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  //Function that creates a new user with the form data
  onRegister(form:any):void{
    this.authService.register(form.value)
    .subscribe((res)=>{
      console.log(res)
      this.router.navigateByUrl('/login');
    })
  }
}
