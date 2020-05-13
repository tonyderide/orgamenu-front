import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {Recette} from "../models/recette";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  constructor(private data:DataService) { }

  indexDateList=[0,1,2,3,4,5,6];
  todayMonth= new Date();



}
