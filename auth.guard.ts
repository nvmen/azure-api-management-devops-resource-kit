import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router,
               private authenticationService: AuthenticateService,
               private userService: UserService) {}
   /**
    * Check user token for routing
    * @return: navigate to login if user token is empty
    */
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userToken = this.authenticationService.userTokenValue;
    if (userToken) {
        if (route.data.isAdmin && route.data.isAdmin !== this.userService.getIsAdmin()) {
          this.router.navigate(['/']);
          return false;
        }
        // authorized user
        return true;
    }
    // not authorized so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}