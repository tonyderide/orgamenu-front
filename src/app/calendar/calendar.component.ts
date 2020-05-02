import {Component, ElementRef, OnChanges, OnInit, Renderer2, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {DataService} from "../shared/data.service";
import {Recette} from "../models/recette";
import {FormControl, FormGroup, FormArray, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  //init des dates
  todayMonth = moment().format('MMMM');

  //parametre
  recettes: Recette[];
  recette=null;

  form: FormGroup;
  constructor(private data:DataService, private fb: FormBuilder) { }



  ngOnInit(): void {
     this.getRecettesService();
  }

  getRecettesService(){
    this.data.getRecettesService().subscribe(
      recettes =>{this.recettes = recettes;
      console.log(recettes)} )
  }

}
