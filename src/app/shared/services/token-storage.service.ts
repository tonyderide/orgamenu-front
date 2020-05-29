import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {Router, RouterLink} from '@angular/router';
import {ToasterService} from './toaster.service';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private token: string;
  private decodedToken;

  constructor(private toaster:ToasterService) { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;

  }

  isTokenExpired(token?: string): boolean {
    if(!token)
      token = this.getToken();
    if(!token)
      return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    //verifie la date d'expiration du token
    console.log(date.valueOf(),new Date().valueOf()-3000000,  (date.valueOf()-new Date().valueOf()));
    if((date.valueOf())-new Date().valueOf() < 300000) this.toaster.showInfo('Connection bientot expiré! Vous serez bientôt être deconnecté!', 'Information');

    return !(date.valueOf() > new Date().valueOf());
  }
}
