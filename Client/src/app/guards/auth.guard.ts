import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserType } from '../models';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isTokenExpired = this.auth.isTokenExpired();
    const isUserLogged = this.auth.isUserLogged();
    const userRole = this.auth.getRole();

    if (isUserLogged && !isTokenExpired) {
      if (userRole === UserType.Director) {
        // this.router.navigateByUrl('resources/subjects');
        return true;
      }

      // No role restriction
      if (!route.data.role) {
        return true;
      }
      // check for role
      if (userRole === route.data.role) {
        return true;
      } else {
        // this.router.navigate(['/perfil'], { queryParams: { returnUrl: state.url } });
        // return false;
      }
    } else {

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

  }
}
