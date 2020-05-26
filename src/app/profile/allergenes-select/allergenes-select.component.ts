import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../shared/services/data.service';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {Allergene} from '../../models/allergene';

@Component({
  selector: 'app-allergenes-select',
  templateUrl: './allergenes-select.component.html',
  styleUrls: ['./allergenes-select.component.scss']
})
export class AllergenesSelectComponent implements OnInit {


  allergeneOptions = [
    'Glutens'
    , 'Céleri'
    , 'Crustacés'
    , 'Moutarde'
    , 'Oeufs'
    , 'Graine de sésame'
    , 'Poissons'
    , 'Lupin'
    , 'Arachides'
    , 'Anhydride sulfureux'
    , 'Soja'
    , 'Lactose'
    , 'Fruits à coque'];

  @Output() reload = new EventEmitter();
  allergenesForm: FormGroup;
  allergenes: FormArray;
  allergenesUser: Allergene[];
  selectedAllergene: string[];
  allergeneValue: any;
  islogged: boolean;

  constructor(private data: DataService,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isloggedIn()
    this.allergenesForm = this.formBuilder.group({
      allergenes: this.formBuilder.array([
        [false],
        [false],
        [false],
        [false],
        [false],
        [false],
        [false],
        [false],
        [false],
        [false],
        [false],
        [false],
        [false]
      ])
    });
    this.getAllergenes();

  }

  isloggedIn():boolean {
    if (this.tokenStorage.getToken()) {
      return this.islogged = true;
    } return this.islogged = false;
  }

  getAllergenes() {
    this.data.getAllergene().subscribe(allergenes => {
      this.allergenesUser = allergenes;
      // console.log('getAllergenes: '+JSON.stringify(this.allergenesUser))
    })
  }

  getAllergeneArrayControls() {
    return (this.allergenesForm.get('allergenes') as FormArray).controls;
  }


  onSubmit() {
    this.allergeneValue = this.allergenesForm.get('allergenes').value;
    this.selectedAllergene = this.allergeneOptions.filter((pref, index) => this.allergeneValue[index]);
    this.allergenesUser = [];
    for (let i = 0; i < this.selectedAllergene.length; i++){
      let item = {
        id : i+1,
        name: this.allergeneOptions[i]
      };
      this.allergenesUser.push(item);
    }
    if (confirm("Etes-vous sur des modifications!!")) {
      this.data.updateAllergenesService(this.allergenesUser)
        .subscribe(_ => {
          this.getAllergenes();
          this.reload.emit();
        })
    }
  }
}
