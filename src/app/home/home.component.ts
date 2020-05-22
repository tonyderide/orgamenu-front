import {Component, OnInit, ViewChild} from '@angular/core';
import {Recette} from "../models/recette";
import {TokenStorageService} from "../shared/services/token-storage.service";
import {IngredientsComponent} from "../calendar/ingredients/ingredients.component";
import {ListeRecetteComponent} from './liste-recette/liste-recette.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('modalIngredient')modal:IngredientsComponent;
  @ViewChild('listRecette')recetteReload:ListeRecetteComponent;
  content: string;
  recettes: Recette[];
  islogged: boolean=true;

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.isloggedIn()
    console.log(this.tokenStorage.isValidToken())
  }

  isloggedIn() {
    if (this.tokenStorage.getToken()) {
      this.islogged = true;
    }
  }

  reload() {

  }
}
