import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userId : number = 0;

  constructor() { }
  getUser(){
    return this.userId;
  }
  setUser(id: number){
    this.userId = id;
  }
}
