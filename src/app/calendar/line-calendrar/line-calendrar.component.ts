import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Recette} from "../../models/recette";
import {DataService} from "../../shared/services/data.service";
import {User} from "../../models/user";
import {Calendrier} from "../../models/calendrier";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {SelectedRecettetodayComponent} from "../selected-recettetoday/selected-recettetoday.component";
import {IngredientsComponent} from "../ingredients/ingredients.component";
import {ToasterService} from '../../shared/services/toaster.service';





@Component({
  selector: 'app-line-calendrar',
  templateUrl: './line-calendrar.component.html',
  styleUrls: ['./line-calendrar.component.scss']
})
export class LineCalendrarComponent implements OnInit {
  @Input('indexDate') index:number;
  @Output() valueUpdate = new EventEmitter();
  @Output() deleteChild =new EventEmitter();
  form: FormGroup;
  buttonType: string;
  recetteMidi:Recette;
  recetteSoir:Recette;
  recettes: Recette[];
  user: User;
  todayDate =new Date();
  showSpinner=false;
  private calendrierJourCourant: Calendrier;
  constructor(private data:DataService,
              private fb: FormBuilder,
              private toaster:ToasterService) {
    this.form = this.fb.group({
      recetteMidi: [''],
      recetteSoir: ['']
    });
  }



  initDate(){
    this.todayDate.setDate(new Date().getDate() + this.index)
    this.calendrierJourCourant={
      'date': formatDate((this.todayDate),'dd/MM/yyyy','fr-FR')
    }

  }
  ngOnInit(): void {
    this.initDate();
    this.getRecettes();
    // this.getCalendrierByDate();
  }

  //choix du bouton
  onSubmit(buttonType: string) {
    if (buttonType==='save'){this.saveDate()}
    if (buttonType==='delete'){this.delete()}

  }

  getRecettes(){
    this.showSpinner=true;
    this.data.getRecettesService()
      .subscribe(recettes =>{
        this.recettes = recettes;
        this.showSpinner = false;
        this.getCalendrierByDate();})
  }

  getCalendrierByDate(){
    //date du jour par rapport à l'index
    this.todayDate.setDate(new Date().getDate() + this.index);
    this.calendrierJourCourant={
      'date': formatDate((this.todayDate),'dd/MM/yyyy','fr-FR')
    }
    this.data.getCalendriersByDateService(this.calendrierJourCourant)
      .subscribe((calendriers: Calendrier[])=> {
          for (let i = 0, len = calendriers.length; i < len; i++) {
            this.recetteMidi = calendriers[0].recettes[0];
            this.recetteSoir = calendriers[1].recettes[0];
            console.log(this.recetteMidi , this.recetteSoir)
            this.form.controls.recetteMidi.setValue(this.recetteMidi.idRecette)
            this.form.controls.recetteSoir.setValue(this.recetteSoir.idRecette)
          }
        },error => this.toaster.showError('la recette n\'est pas sauvegardé','Save')
      )
  }

  saveDate(){
    let idRecetteMidi:string = this.form.controls.recetteMidi.value;
    let idRecetteSoir:string = this.form.controls.recetteSoir.value;
    //Todo delete avant
    if(this.data.getCalendriersByDateService(this.calendrierJourCourant).subscribe()){
      this.data.deleteCalendrier(this.calendrierJourCourant).subscribe()
    }
    this.data.saveCalendrierService(this.calendrierJourCourant,idRecetteMidi)
      .subscribe(_=> {
        this.toaster.showSuccess('la recette est sauvegardé!','Save')
        this.data.saveCalendrierService(
          this.calendrierJourCourant, idRecetteSoir)
            .subscribe(_=> this.valueUpdate.emit())  },
        error => this.toaster.showError('la recette n\'est pas sauvegardé','Save'))
  }


  private delete() {
    if (!this.form.controls.recetteMidi.value&&!this.form.controls.recetteMidi.value){
      console.log(this.form.controls.recetteMidi.value)
      this.toaster.showError('pas de recette a supprimé!','Save')
    }else {
      this.data.deleteCalendrier(this.calendrierJourCourant)
        .subscribe(_ => {
          this.toaster.showWarning('les recettes ont été supprimé à cette date!', 'Save');
          this.form.controls.recetteMidi.setValue('');
          this.form.controls.recetteSoir.setValue('');
          this.deleteChild.emit();
        }, error => this.toaster.showError('les recettes n\'ont pas été supprimé !', 'Save'));
    }

  }

}
