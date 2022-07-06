import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI,UserDB } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(    
    private httpClient: HttpClient
  ) { }
  
  getUsers(): Observable<UserDB[]>{
    return this.httpClient.get<UserDB[]>('/api/users');
  }

  getUser(id:string) :Observable<UserDB[]>{
    return this.httpClient.get<UserDB[]>('/api/user/'+id);
  }

  updateUser(id:any, user:UserDB):Observable<any>{
    const userToUpdateRequest: any ={
      userName: user.userName,
      password: user.password,
      role: user.role
    }
    return this.httpClient.put<any>('/api/user/'+id,userToUpdateRequest)
  }

}
