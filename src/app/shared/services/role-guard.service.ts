import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import decode from 'jwt-decode';
import {TokenStorageService} from "./token-storage.service";
import {AuthGuardService} from "./auth-guard.service";
@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private auth: AuthGuardService, public router: Router, private tokenStorage :TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roleAttendu = route.data.expectedRole;
    const tokenRoles= this.tokenStorage.getUser().roles
    // decode the token to get its payload

    console.log(tokenRoles)
    if ( !this.auth.isAuthenticated() || tokenRoles !== roleAttendu) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
