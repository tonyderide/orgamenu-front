import {Component, OnInit, ViewChild} from '@angular/core';
import {Recette} from "../models/recette";
import {TokenStorageService} from "../shared/services/token-storage.service";
import {IngredientsComponent} from "../calendar/ingredients/ingredients.component";
import {ListeRecetteComponent} from './liste-recette/liste-recette.component';
import {Token} from '@angular/compiler';


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
  recettesDuJour: boolean=false;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit() {
    if (!!this.token.getToken()){this.recettesDuJour=true}
  }

  reload() {
    window.location.reload();
  }
}
