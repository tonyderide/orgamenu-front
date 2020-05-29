import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {TokenStorageService} from "../shared/services/token-storage.service";
import {Router} from "@angular/router";
import {ToasterService} from '../shared/services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router:Router,
              private toaster:ToasterService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.toaster.showSuccess('Vous êtes connecté!!','connexion')
        this.myHome();
    }

  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        // sauvegarde du token
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
        if(data){
          this.router.navigate(['/'])
        }
      },
      err => {
        this.toaster.showError('la connexion a echoué!!','connexion')
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  myHome(){
    this.router.navigate(['home']);
  }


}
