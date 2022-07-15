import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from './users.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDB } from 'src/app/models/user';
const users:Array<UserDB>=[{
  id: 1, 
  userName: 'Rix', 
  password: 'password1234',
  role: 'Admin',
  dateTime: '2022-06-14 15:23:35',
  updateTime: '2022-06-24 14:59:56'
}]

describe('UsersService', () => {
  let service: UsersService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[UsersService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });
  
  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  it('GET Users working and returning correct type of value',()=>{
    service.getUsers().subscribe((resp:UserDB[])=>{
      expect(resp).toEqual(users);
    });
    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('GET User by id working and returning correct type of value',()=>{
    service.getUser('1').subscribe((resp:UserDB[])=>{
      expect(resp).toEqual(users);
    });
    const req = httpMock.expectOne('/api/user/1');
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('PUT to update a user working and returning correct type of value',()=>{
    const requestUser:UserDB ={
      id: 1, 
      userName: 'New Name', 
      password: 'Password1234',
      role: 'Kitchen',
      dateTime: '2022-06-14 15:23:35',
      updateTime: '2022-06-24 14:59:56'
    }
    service.updateUser(1,requestUser).subscribe((resp:string)=>{
      expect(resp).not.toBeNull();
    });
    const req = httpMock.expectOne('/api/user/1');
    expect(req.request.method).toBe('PUT');
  });
});