import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  role = ['Admin','Kitchen','Waiter'];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister(form:any):void{
    this.authService.register(form.value)
    .subscribe(res=>{
      this.router.navigateByUrl('/auth');
    })
  }
}
