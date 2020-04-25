import { Component, OnInit } from '@angular/core';
import {Recette} from "../models/recette";

import {UserService} from "../../services/user.service";
import {DataService} from "../shared/data.service";


@Component({
  selector: 'app-liste-recette',
  templateUrl: './liste-recette.component.html',
  styleUrls: ['./liste-recette.component.scss']
})
export class ListeRecetteComponent implements OnInit {
  content: string;
  recettes: Recette[];

  constructor(private userService: UserService, private data: DataService ){ }

  ngOnInit() {
    this.getRecettes();
  }
  //recupe de la liste de recette dans recettes
  getRecettes(){
    this.data.getRecettesService().subscribe(recettes => {
      this.recettes = recettes;
      console.log(this.recettes)
    });
  }
  getEtapes(){

  }
}

