import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {DataService} from "../shared/services/data.service";
import {Recette} from "../models/recette";
import {Etapes} from "../models/etapes";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  content: string;
  recettes: Recette[];
  etapes: Etapes ;
  constructor(private userService: UserService){ }

  ngOnInit() {
  }
}
