import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../shared/services/token-storage.service';
import {DataService} from '../shared/services/data.service';
import {User} from '../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  reload() {
    window.location.reload();
  }
}
