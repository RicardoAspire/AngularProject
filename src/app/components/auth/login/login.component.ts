import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Declaration of variables
  user = {
    userName: 'Rix',
    password: 'password123456'
  }
  public userName : string = '';
  public role : string = '';

  //Services needed
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }
  
  //Function that verifies the type of role the user has, and redirects to their own view
  onLogin(form:any){
    this.authService.signIn(this.user)
    .subscribe((res:any)=>{
      localStorage.setItem('token',res.token);
      const token = localStorage.getItem('token');
      if(token){
        const tokenDecoded:any = decode(token)
        this.userName = tokenDecoded.userName;
        this.role = tokenDecoded.role;
        if(this.role == 'Admin'){
          this.router.navigateByUrl('/products')
          .then(()=>{
            window.location.reload();
          });
        }    
        if(this.role == 'Kitchen'){
          this.router.navigateByUrl('/kitchen')
          .then(()=>{
            window.location.reload();
          });
        }    
        if(this.role == 'Waiter'){
          this.router.navigateByUrl('/orders')
          .then(()=>{
            window.location.reload();
          });
        }    
        window.location.reload();
      };
    })
  }
}
