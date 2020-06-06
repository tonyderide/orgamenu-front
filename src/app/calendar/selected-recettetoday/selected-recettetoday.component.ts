import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {DataService} from "../../shared/services/data.service";
import {Recette} from "../../models/recette";
import {Calendrier} from "../../models/calendrier";
import {Subscription} from "rxjs";
import {TokenStorageService} from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-selected-recettetoday',
  templateUrl: './selected-recettetoday.component.html',
  styleUrls: ['./selected-recettetoday.component.scss']
})
export class SelectedRecettetodayComponent implements OnInit{
  todaydate= formatDate((new Date()),'dd/MM/yyyy','fr-FR')
  calendrier:Calendrier;
  @Input('recettes') recettes:Recette[];
  @Input('update') update;

  constructor(private data: DataService,
              private token:TokenStorageService) { }

  ngOnInit(): void {
    if (!this.token.getToken()) {
      this.recettes = [];
    }else {
      this.getCalendrier();
    }
  }

  getCalendrier(){

    this.data.getCalendriersByDateService({'date':this.todaydate})
      .subscribe(result => {this.recettes = [result[0].recettes[0],result[1].recettes[0]]
      })
  }

  deleteChild() {
    this.data.getCalendriersByDateService({'date':this.todaydate})
      .subscribe(result => {this.recettes = []//[result[0].recettes[0],result[1].recettes[0]]
      })
  }
}
