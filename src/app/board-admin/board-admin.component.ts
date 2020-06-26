import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../shared/services/data.service';
import {ToasterService} from '../shared/services/toaster.service';
import {Recette} from '../models/recette';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements  AfterViewChecked,OnInit{
  formRecette:FormGroup;
  submitted=false;
  recettes:Recette[];
  get form() { return this.formRecette.controls; }
  get etapes(){ return this.formRecette.get('etapes') as FormArray};
  get ingredients() {return this.formRecette.get('ingredients') as FormArray};

  constructor(private fb:FormBuilder,
              private data:DataService,
              private toaster:ToasterService) {
    this.formRecette= this.fb.group({
      name: new FormControl('', Validators.required),
      calorie: new FormControl('', Validators.required),
      tempPreparation: new FormControl('', Validators.required),
      tempCuisson: new FormControl('', Validators.required),
      imageUrl: new FormControl(''),
      ingredients: this.fb.array([
        this.addIngredientsFormGroup()
      ]),
      etapes: this.fb.array([
        this.addEtapesFormGroup()
      ])
    })
  }

  ngOnInit(): void {
    this.data.getRecettesService().subscribe(recettes=> {
      console.log(this.recettes)
      this.recettes = recettes;
    });
    }
  /**
   * add the formgroup ingredient with is value
   */
  addIngredientsFormGroup():FormGroup {
    return this.fb.group({
      quantity: new FormControl(''),
      nomIngredient: new FormControl(''),
      allergene: new FormControl(''),
      type: new FormControl('')
    })
  }
  /**
   * add the formGroup etape with is value
   */
  addEtapesFormGroup():FormGroup {
    return this.fb.group({
      numero: new FormControl(''),
      etape: new FormControl('')
    })
  }
  /**
   * submit the form, clear and reset the form
   */
  onSubmit() {
    this.submitted=true
    if (this.formRecette.invalid) {
      this.toaster.showError('le formulaire n\'est pas invalide', 'Erreur')
      return;
    }
    this.data.saveRecette(this.formRecette.value).subscribe(_=>
      this.toaster.showSuccess('la recette est enregistré!','Enregistré'));
    this.formRecette.reset();
    this.etapes.clear();
    this.ingredients.clear();
    this.addEtapesButton();
    this.addIngredientsButton();
  }
  /**
   * add one etape in the array of etapes
   */
  addEtapesButton(){
    (<FormArray>this.formRecette.get('etapes')).push(this.addEtapesFormGroup());
  }
  /**
   * add one ingredient in the array of ingredients
   */
  addIngredientsButton(){
    (<FormArray>this.formRecette.get('ingredients')).push(this.addIngredientsFormGroup());
  }
  /**
   * remove the selected etape
   * @param etape
   */
  removeEtapeButton(etape){
    if (etape>0) {
      this.etapes.removeAt(etape);
    }else{
      this.toaster.showWarning('il faut au minimum une étape','Attention')
    }

  }
  /**
   * remove the selected ingredient
   * @param ingredient
   */
  removeIngredientButton(ingredient){
    if (ingredient>0) {
      this.ingredients.removeAt(ingredient);
    }else{
      this.toaster.showWarning('il faut au minimum un ingrédient','Attention')
    }
  }
  /**
   * scroll bar at bottom after a change of the view
   */
  ngAfterViewChecked(): void {
    window.scrollTo(0,document.body.scrollHeight);
    }

  selectOption(value: any) {
    // console.log(JSON.stringify(this.selectedRecette.name));
    // this.formRecette.patchValue(this.selectedRecette)
  }
}
