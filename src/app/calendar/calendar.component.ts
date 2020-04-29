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
  momentLocal= moment.locale('fr');
  todayMonth= moment().format('MMMM');
  todayJour  =  moment().format('dddd');
  todayJour2 = moment().add(1,'days').format('dddd');
  todayJour3 = moment().add(2,'days').format('dddd');
  todayJour4 = moment().add(3,'days').format('dddd');
  todayJour5 = moment().add(4,'days').format('dddd');
  todayJour6 = moment().add(5,'days').format('dddd');
  todayJour7 = moment().add(6,'days').format('dddd');
  todayDate : Date = new Date();
  todayDate2: Date = new Date();
  todayDate3: Date = new Date();
  todayDate4: Date = new Date();
  todayDate5: Date = new Date();
  todayDate6: Date = new Date();
  todayDate7: Date = new Date();
  addOneDay:number = this.todayDate.getDate();
  weekJour=[this.todayJour, this.todayJour2, this.todayJour3, this.todayJour4, this.todayJour5,this.todayJour6, this.todayJour7]
  weekDate: Date[]=[this.todayDate,this.todayDate2,this.todayDate3,this.todayDate4,this.todayDate5,this.todayDate6,this.todayDate7]

  //parametre
  recettes: Recette[];
  recette=null;
  nbDeBoutton = [1,2,3,4,5,6,7];

  form: FormGroup;
  constructor(private data:DataService, private fb: FormBuilder) { }



  ngOnInit(): void {
    this.todayDate2.setDate(this.addOneDay + 1);
    this.todayDate3.setDate(this.addOneDay + 2);
    this.todayDate4.setDate(this.addOneDay + 3);
    this.todayDate5.setDate(this.addOneDay + 4);
    this.todayDate6.setDate(this.addOneDay + 5);
    this.todayDate7.setDate(this.addOneDay + 6);
    this.weekDate=[this.todayDate,this.todayDate2,this.todayDate3,this.todayDate4,this.todayDate5,this.todayDate6,this.todayDate7]
    this.getRecettesService();
  }

  getRecettesService(){
    this.data.getRecettesService().subscribe(
      recettes =>{this.recettes = recettes;
      console.log(recettes)} )
  }



  onChange(index: number) {
    console.log(index)
  }
}
