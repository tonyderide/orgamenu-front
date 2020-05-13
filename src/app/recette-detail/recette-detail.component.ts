import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../shared/services/data.service";
import {Recette} from "../models/recette";
import {Etapes} from "../models/etapes";
import {Ingredient} from "../models/ingredient";
import {Calendrier} from "../models/calendrier";

@Component({
  selector: 'app-recette',
  templateUrl: './recette-detail.component.html',
  styleUrls: ['./recette-detail.component.scss']
})
export class RecetteDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private data:DataService) {}

  public recette: Recette;
  public etapes:Etapes[];
  public ingredients:Ingredient[];
  public calendriers:Calendrier[];

  ngOnInit(): void {
    const idUrl = this.route.snapshot.paramMap.get('id');
    this.getRecette(idUrl);
  }

  getRecette(id) {
    this.data.getRecettesByIdService(id).subscribe(recette => {
      this.recette = recette;
      this.etapes = recette.etapes;
      this.ingredients=recette.ingredients;
      this.calendriers=recette.calendriers;
      console.log(this.recette)
      console.log(this.etapes)
      console.log(this.ingredients)
    });
  }
}
