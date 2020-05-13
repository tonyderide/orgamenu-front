import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Recette} from "../../models/recette";
import {DataService} from "../../shared/services/data.service";
import {User} from "../../models/user";
import {Calendrier} from "../../models/calendrier";
import {formatDate} from "@angular/common";





@Component({
  selector: 'app-line-calendrar',
  templateUrl: './line-calendrar.component.html',
  styleUrls: ['./line-calendrar.component.scss']
})
export class LineCalendrarComponent implements OnInit {
  @Input('indexDate') index:number;
  form: FormGroup;
  recettes$
  recetteMidi: Recette;
  recetteSoir: Recette;

  constructor(private data:DataService, private fb: FormBuilder) {
    this.form = this.fb.group({
      recetteMidi: [''],
      recetteSoir: ['']
    });
  }

  recetteToSaveMidi:Recette;
  recetteToSaveSoir:Recette;
  recettes: Recette[];
  user: User;
  todayDate =new Date();
  private calendrierJourCourant: Calendrier;


  initDate(){
    this.todayDate.setDate(new Date().getDate() + this.index)
    this.calendrierJourCourant={
    'date': formatDate((this.todayDate),'dd/MM/yyyy','fr-FR')
  }

  }
  ngOnInit(): void {
    this.initDate();
    this.getRecettes();
    //recuperation des dates et affectation de la recette associée dans le dom
    this.getCalendrierByDate();

  }

  // ngAfterViewInit(){
  // this.getCalendrierByDate();
  // set les valeurs de recette presente pour l'user
  // }

  //choix du bouton
  buttonType: string;
  onSubmit(buttonType: string) {
    if (buttonType==='save'){this.saveDate()}
    if (buttonType==='update'){this.update()}

  }

  getCalendrierByDate(){
    //date du jour par rapport à l'index
    this.todayDate.setDate(new Date().getDate() + this.index);
    this.calendrierJourCourant={
      'date': formatDate((this.todayDate),'dd/MM/yyyy','fr-FR')
    }
    this.data.getCalendriersByDateService(this.calendrierJourCourant).subscribe(
      (calendriers: Calendrier[])=> {
        for (let i = 0, len = calendriers.length; i < len; i++) {
          this.recetteToSaveMidi = calendriers[0].recettes[0];
          this.recetteToSaveSoir = calendriers[1].recettes[0];
          console.log(this.recetteToSaveMidi , this.recetteToSaveSoir)
          this.form.controls['recetteMidi'].patchValue(this.recetteToSaveMidi.idRecette)
          this.form.controls['recetteSoir'].patchValue(this.recetteToSaveSoir.idRecette)

        }
      }
    )
  }

  compareFn(c1: Recette, c2:Recette): boolean {
    return c1 && c2 ? c1.idRecette === c2.idRecette : c1 === c2;
  }

  saveDate(){
    let idRecetteMidi:string = this.form.controls.recetteMidi.value;
    let idRecetteSoir:string = this.form.controls.recetteSoir.value;
    if (idRecetteMidi&&idRecetteSoir){
      this.data.saveCalendrierService(this.calendrierJourCourant,idRecetteMidi)
        .subscribe(response=>console.log(response))
      this.data.saveCalendrierService(this.calendrierJourCourant,idRecetteSoir)
        .subscribe(response=>console.log(response))
    }else{
      this.data.deleteCalendrier(this.calendrierJourCourant)
        .subscribe(_=> console.log('deleted'+this.calendrierJourCourant.date))
    }
    // let recette=[this.dataForm.controls.recetteMidi.value,this.dataForm.controls.recetteSoir.value]
    //
    // recette.forEach(function (idRecette:string){
    //   if (idRecette){
    //     this.data.saveCalendrierService(this.calendrierJourCourant,idRecette)
    //       .subscribe(response=>console.log(response))
    //   }else{
    //     this.data.deleteCalendrier(this.calendrierJourCourant)
    //       .subscribe(_=> console.log('deleted'+this.calendrierJourCourant.date))
    //   }
    // });
  }



  getRecettes(){
    this.data.getRecettesService().subscribe(
      (recettes) =>{this.recettes = recettes;}
      )
  }


  update() {

  }



}
  //
  //
  // compareDate(id:number) {
  //   this.data.getUserByIDService(id).subscribe(
  //     (user: User) =>{ this.user = user;
  //                           console.log(user);
  //                           this.recettesUser=user?.recettes;
  //                           console.log(this.recettesUser)
  //       for (let i = 0, len = this.recettesUser?.length; i < len; i++) {
  //         this.calendriersUser=this.recettesUser[i].calendriers;
  //         this.recetteUserId=this.recettesUser[i].idRecette
  //         console.log(this.calendriersUser)
  //         for(let i = 0, len = this.calendriersUser.length; i < len; i++){
  //           this.calendrierUser = this.calendriersUser[i]
  //             console.log(this.calendrierUser.date+' '+'idUser: '+this.recetteUserId+' '+  formatDate((this.todayDate),'dd/MM/yyyy','fr-FR'))
  //           if(this.calendrierUser.date.toString()===formatDate((this.todayDate),'dd/MM/yyyy','fr-FR')){
  //             this.data.getRecettesByIdService(this.recetteUserId).subscribe(
  //               recetteFinded=> {
  //                 this.recetteToSaveMidi = recetteFinded;
  //                 this.isLoadedMidi=true;
  //                 console.log('recettemidi: '+this.recetteToSaveMidi.name);
  //               }
  //             )
  //           }
  //         }
  //       }
  //     }
  //   )
  // }
