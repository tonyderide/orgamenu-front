import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/services/data.service";
import {FormBuilder} from "@angular/forms";
import {Allergene} from "../models/allergene";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {
  allergenes: Allergene[];

  constructor(private data:DataService,
              private fb: FormBuilder) { }

  ngOnInit() {
  this.getIngredients();
  }

  getIngredients() {
    this.data.getAllergene().subscribe(allergenes => this.allergenes = allergenes)
  }

  buttonType: string;
  onSubmit(buttonType: string) {
    if (buttonType==='save'){this.saveDate()}
    if (buttonType==='update'){this.delete()}

  }

  private saveDate() {

  }

  private delete() {

  }
}
