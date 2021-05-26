import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {

  }
  canActivate(
  ) {
    let identity = this._userService.getToken()
   

    if (identity != undefined && identity != '0') {
      return true;
    } else {
      this._router.navigate(['/login'])
      return false
    }

  }

}
