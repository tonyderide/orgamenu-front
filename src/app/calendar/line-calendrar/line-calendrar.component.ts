import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from "moment";
import {Recette} from "../../models/recette";
import {DataService} from "../../shared/data.service";


@Component({
  selector: 'app-line-calendrar',
  templateUrl: './line-calendrar.component.html',
  styleUrls: ['./line-calendrar.component.scss']
})
export class LineCalendrarComponent implements OnInit {
  @Input() index:number;
  //init date en fr propre à momentjs
  momentLocal= moment.locale('fr');
  dataForm: FormGroup;
  recettes: Recette[];
  recetteToSaveMidi:Recette;
  public dateJMA: string;
  public JourAlph: string;
  public JourNum: string;

  constructor(private data:DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    //TODO remplacer par un input de calendar
    this.getRecettesService();
    //création des dates à l'init
    this.JourAlph = moment().add(this.index,'days').format('dddd');
    this.JourNum = moment().add(this.index,'days').format('DD');
    this.dateJMA = (moment()).add(this.index, 'days').format('DD/MM/YYYY').toString();

    this.dataForm = this.fb.group({
      recetteMidi: [],
      recetteSoir: []
    });
    console.log('debut de l\'init: '+this.index,this.JourAlph,this.JourNum,this.dateJMA)
  }
  //choix du bouton
  buttonType: string;
  onSubmit(buttonType: string) {
    if (buttonType==='save'){this.saveDate()}
    if (buttonType==='update'){this.update()}

  }

  saveDate(){
    console.log('dataform:', this.dataForm.value)
    this.recetteToSaveMidi=this.dataForm.value.recetteMidi;
    this.recetteToSaveMidi?.calendrier.push({idCalendrier:1, date : this.dateJMA.toString()})
    console.log('recette a sauvegardé'+this.recetteToSaveMidi)
  }

  getRecettesService(){
    this.data.getRecettesService().subscribe(
      recettes =>{this.recettes = recettes;
      console.log(recettes)})
  }

  private update() {

  }

  getRecetteBydate(){

  }

}
