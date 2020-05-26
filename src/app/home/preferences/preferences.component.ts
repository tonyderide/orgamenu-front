import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {DataService} from '../../shared/services/data.service';
import {PreferenceAlim} from '../../models/preferenceAlim';
import {TokenStorageService} from '../../shared/services/token-storage.service';



@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  preferenceOptions = [
    'Pâte'
    , 'Riz'
    , 'Fromage'
    , 'Lait'
    , 'Frite'
    , 'Viande'
    , 'Poisson'
    , 'Légumes'
    , 'Chocolat'
    , 'Volaille'
    , 'Fruit'
    , 'Pomme de terre'];

  preferencesForm: FormGroup;
  preferences: FormArray;
  @Output() reload = new EventEmitter();
  preferencesUser: PreferenceAlim[];
  selectedPreference: string[];
  preferenceValue: any;
  islogged: boolean;

  constructor(private data: DataService,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isloggedIn()
    this.preferencesForm = this.formBuilder.group({
      preferences: this.formBuilder.array([
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
        [true],
        [true]
      ])
    });
    this.getPreferences();

  }

  isloggedIn():boolean {
    if (this.tokenStorage.getToken()) {
      return this.islogged = true;
    } return this.islogged = false;
  }

  getPreferences() {
    this.data.getPreferences().subscribe(preferences => {
      this.preferencesUser = preferences;
      console.log('getPreference'+JSON.stringify(this.preferencesUser))
    })
  }

  getPreferenceArrayControls() {
    return (this.preferencesForm.get('preferences') as FormArray).controls;
  }


  onSubmit() {
    this.preferenceValue = this.preferencesForm.get('preferences').value;
    this.selectedPreference = this.preferenceOptions.filter((pref, index) => this.preferenceValue[index]);
    this.preferencesUser = [];
    for (let i = 0; i < this.selectedPreference.length; i++){
      let item = {
        idPreferenceAliment : i+1,
        nomPreferenceAliment: this.preferenceOptions[i]
      };
      this.preferencesUser.push(item);
    }
    this.data.updatePreferencesService(this.preferencesUser)
      .subscribe(_=> {
        this.getPreferences();
        this.reload.emit();
      })

  }
}
