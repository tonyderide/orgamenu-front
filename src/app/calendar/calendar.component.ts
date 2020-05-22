import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {Recette} from "../models/recette";
import {Calendrier} from "../models/calendrier";
import {formatDate} from "@angular/common";
import {SelectedRecettetodayComponent} from "./selected-recettetoday/selected-recettetoday.component";
import {error} from "@angular/compiler/src/util";
import {IngredientsComponent} from "./ingredients/ingredients.component";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{
  @ViewChild(SelectedRecettetodayComponent)
  private selectedRecette: SelectedRecettetodayComponent;
  @ViewChild(IngredientsComponent)
  private selectedIngredients:IngredientsComponent ;
  recettes: Recette[];
  calendrier: Calendrier;
  dateDuJour: string;
  constructor(private data:DataService) { }

  indexDateList=[0,1,2,3,4,5,6];
  todayMonth= new Date();

  ngOnInit(): void {
  }

  getRecetteToday(){
    this.dateDuJour= formatDate((new Date()),'dd/MM/yyyy','fr-FR')
    this.calendrier= {'date': this.dateDuJour}
    this.data.getCalendriersByDateService(this.calendrier)
      .subscribe(result => {this.recettes = [result[0].recettes[0],result[1].recettes[0]]
      })
  }

  getUpdatedvalue() {
    this.selectedIngredients.getIngredientJour()
    this.getRecetteToday();
  }

  deleteChild() {
    this.selectedRecette.deleteChild();
    this.selectedIngredients.deleteIng();
  }
}
