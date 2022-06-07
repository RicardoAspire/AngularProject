import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from 'src/app/models/user';
import { JwtResponseI } from 'src/app/models/jwt-response';
import { tap,observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER : string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: any = ''; 

  constructor(private httpClient: HttpClient) { }
  
  register(user: UserI){
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,user)
    .pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          //Save token      
          this.saveToken(res.dataUser.accessTocken, res.dataUser.expiresIn);
        }
      }
    ))
  }
  
  login(user: UserI){
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,user)
    .pipe(tap(
      (res:JwtResponseI)=>{
        if(res){
          //Save token      
          this.saveToken(res.dataUser.accessTocken, res.dataUser.expiresIn);
        }
      }
    ))
  }

  logOut(){
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token:string, expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);
    this.token = token;
  }

  private getToken():string{  
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token
  }
}
