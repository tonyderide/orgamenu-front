import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {DataService} from '../../shared/services/data.service';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})

export class UpdateProfileComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: User;
  updateForm: FormGroup;

  constructor(private data: DataService,
              private tokenStorageService: TokenStorageService) {
    this.updateForm = new FormGroup({
      username:new FormControl(this.user?.username,[Validators.required, Validators.minLength(3),Validators.maxLength(20)]),
      email:new FormControl('', [Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      firstname: new FormControl('',Validators.required),
      lastname:new FormControl('',Validators.required),
      size: new FormControl('',Validators.required),
      weight: new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      sexe: new FormControl('',Validators.required)});

  }

  ngOnInit() {
    this.getUserByUsername();
  }

  update() {
    console.log(this.updateForm.value)
    this.data.updateUserService(this.updateForm.value).subscribe()
  }

  getUserByUsername(){
    this.user =this.tokenStorageService.getUser();
    console.log(this.user.username)
    this.data.getUserByUsernameService(this.user.username)
      .subscribe(user => {
        this.user = user;
        console.log(user)
        this.updateForm.get('username').setValue(this.user.username)
        this.updateForm.get('email').setValue(this.user.email)
        this.updateForm.get('firstname').setValue(this.user.firstname)
        this.updateForm.get('lastname').setValue(this.user.lastname)
        this.updateForm.get('size').setValue(this.user.size)
        this.updateForm.get('weight').setValue(this.user.weight)
        this.updateForm.get('age').setValue(this.user.age)
        this.updateForm.get('sexe').setValue(this.user.sexe)
      })
  }

}
