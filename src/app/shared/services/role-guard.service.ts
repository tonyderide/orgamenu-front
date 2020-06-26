import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {TokenStorageService} from "./token-storage.service";
import {AuthGuardService} from "./auth-guard.service";
import {ToasterService} from './toaster.service';
@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(private auth: AuthGuardService,
              public router: Router,
              private tokenStorage :TokenStorageService,
              private toasterService:ToasterService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roleAttendu = "ROLE_ADMIN"
    if (this.tokenStorage.getUser()) {
      const tokenRoles = this.tokenStorage.getUser().roles;
      if (  tokenRoles[0] === roleAttendu || tokenRoles[1] === roleAttendu ) {
        return true;
      }
      this.router.navigate(['/login']);
      this.toasterService.showError('Erreur','Vous devez être administrateur pour vous connecter!')
      return false;
    }
    this.toasterService.showError('Erreur','Veuillez-vous connectez!')
    this.router.navigate(['/login']);
  }
}
