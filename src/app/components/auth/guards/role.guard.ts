import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    public router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot):boolean{
    const expectedRole  = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    if(token){
      const tokenDecoded:any = decode(token)
      const role = tokenDecoded.role;
      if(this.authService.isAuth() && role == "Admin"){
        return true;
      }else if(!this.authService.isAuth() || role != expectedRole){
        console.log('user not authorized');
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
    };
    return true;
  }
  
}
