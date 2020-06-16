import {AfterViewChecked, Component} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements  AfterViewChecked{
  formRecette:FormGroup;
  constructor(private fb:FormBuilder) {
    this.formRecette= this.fb.group({
      name: new FormControl('',),
      calorie: new FormControl(''),
      tempPreparation: new FormControl(''),
      tempCuisson: new FormControl(''),
      imageUrl: new FormControl(''),

      ingredients: this.fb.array([
        this.addIngredientsFormGroup()
      ]),

      etapes: this.fb.array([
        this.addEtapesFormGroup()
      ])
    })
  }


  get etapes(){ return this.formRecette.get('etapes') as FormArray};
  get ingredients() {return this.formRecette.get('ingredients') as FormArray};

  /**
   * submit the form, clear and reset the form
   */
  onSubmit() {
    console.log(this.formRecette.value);
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
    }
  }

  /**
   * remove the selected ingredient
   * @param ingredient
   */
  removeIngredientButton(ingredient){
    if (ingredient>0) {
      this.ingredients.removeAt(ingredient);
    }
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
   * add the formgroup ingredient with is value
   */
  addIngredientsFormGroup():FormGroup {
    return this.fb.group({
      quantity: new FormControl(''),
      nomIngredient: new FormControl(''),
      allergene: new FormControl('')
    })
  }

  /**
   * scroll bar at bottom after a change of the view
   */
  ngAfterViewChecked(): void {
    window.scrollTo(0,document.body.scrollHeight);
    }
}
