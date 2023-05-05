import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';


export namespace AuthGuard {

  export const canActivate: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {

    const auth = inject(AuthService);
    const router = inject(Router);
    const jwtHelper = inject(JwtHelperService)


    const token = auth.getToken();

    if (token && !jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      router.navigate([''])
      return false;
    }    
  }

  export const canActivateChild = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => canActivate(route, state)
}


