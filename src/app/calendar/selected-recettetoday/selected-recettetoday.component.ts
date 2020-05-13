import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";
import {DataService} from "../../shared/services/data.service";
import {Recette} from "../../models/recette";
import {Calendrier} from "../../models/calendrier";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-selected-recettetoday',
  templateUrl: './selected-recettetoday.component.html',
  styleUrls: ['./selected-recettetoday.component.scss']
})
export class SelectedRecettetodayComponent implements OnInit {
  todaydate= formatDate((new Date()),'dd/MM/yyyy','fr-FR')
  calendrier:Calendrier;
  calendriers:Calendrier[];
  private recettes: Recette[];

  constructor(private data: DataService) { }

  ngOnInit(): void {
  this.getCalendrier();
  }


  getCalendrier(){
    this.calendrier={'date':this.todaydate}
    this.data.getCalendriersByDateService(this.calendrier)
      .subscribe(result=>{

      })
  }

}
