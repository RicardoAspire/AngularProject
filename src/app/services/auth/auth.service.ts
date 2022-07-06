import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt/';
import { UserI } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  signIn(user:any){
    return this.httpClient.post('/api/login',user)
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(!token || this.jwtHelper.isTokenExpired(token)){
      return false;
    }
    return true;
  }

  register(user: UserI): Observable<UserI>{
    const bodyRequest = {
      userName: user.userName,
      password: user.password,
      role: user.role
    };
    return this.httpClient.post<UserI>('/api/register',bodyRequest);
  }

  
}
