import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let component: AuthGuard;
  let fixture: ComponentFixture<AuthGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,       
      ],
      declarations:[
        AuthGuard
      ],
      providers: [
        AuthService,    
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AuthGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
