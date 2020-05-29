import { Component, OnInit } from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {formatDate} from "@angular/common";
import {Calendrier} from "../../models/calendrier";
import {Ingredient} from "../../models/ingredient";


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit{
  private dateDuJour: string;
  private calendrier: Calendrier;
  ingredientsMidi?:Ingredient[];
  ingredientsSoir?:Ingredient[];
  todayDate=formatDate((new Date()),'dd/MM/yyyy','fr-FR')

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.getIngredientJour();
  }

  getIngredientJour(){
    this.dateDuJour= formatDate((new Date()),'dd/MM/yyyy','fr-FR')
    this.calendrier= {'date': this.dateDuJour}
    this.data.getCalendriersByDateService(this.calendrier)
    .subscribe(result=>{

        this.ingredientsMidi=result[0].recettes[0].ingredients;
        this.ingredientsSoir=result[1].recettes[0].ingredients;
    })
  }

  deleteIng() {
    this.data.getCalendriersByDateService({'date':this.todayDate})
      .subscribe(result => {this.ingredientsMidi = [] ;this.ingredientsSoir = []})

  }

  open() {

  }
}
