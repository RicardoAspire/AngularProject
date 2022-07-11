import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  //Declarations and variables 
  public userName : string = '';
  public role : string = '';
  public auth: boolean = false;

  //Services needed
  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  //Function that decodes the username and role from the token
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      const tokenDecoded:any = decode(token)
      this.userName = tokenDecoded.userName;
      this.role = tokenDecoded.role;
    };
    if(this.authService.isAuth()){
      this.auth = true;
    }else if(!this.authService.isAuth()){
      this.auth = false;
    }
  }

  //Function that deletes the token and redirects to the login
  logOut(){
    localStorage.removeItem('token');    
    this.router.navigate(['login']);
    this.ngOnInit();    
  }

}
