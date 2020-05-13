import {Injectable} from "@angular/core";
import { Router, CanActivate } from '@angular/router';
import {TokenStorageService} from "./token-storage.service";
@Injectable()
export class AuthGuardService implements CanActivate {

  private roles: any;
  constructor( public router: Router, private tokenStorage: TokenStorageService) {}

  isAuthenticated():boolean {
    return !!this.tokenStorage.getToken();
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
