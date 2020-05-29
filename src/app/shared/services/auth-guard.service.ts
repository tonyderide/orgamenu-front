import {Injectable} from "@angular/core";
import { Router, CanActivate } from '@angular/router';
import {TokenStorageService} from "./token-storage.service";
import {ToasterService} from './toaster.service';
@Injectable()
export class AuthGuardService implements CanActivate {

  private roles: any;
  constructor( public router: Router,
               private tokenStorage: TokenStorageService,
               private toaster: ToasterService) {}

  isAuthenticated():boolean {
    //test si il y a une  valeur
    return !!this.tokenStorage.getToken();
  }

  canActivate(): boolean {

    if (!this.isAuthenticated() || this.tokenStorage.isTokenExpired()) {
      this.tokenStorage.signOut();
      this.router.navigate(['login']).then(r => this.toaster.showWarning('Vous avez été déconnecté! fin de vie du token.','Alert') );
      return false;
    }
    return true;
  }
}
