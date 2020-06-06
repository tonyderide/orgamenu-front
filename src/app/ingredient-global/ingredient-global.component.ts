import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import {Ingredient} from '../models/ingredient';

@Component({
  selector: 'app-ingredient-global',
  templateUrl: './ingredient-global.component.html',
  styleUrls: ['./ingredient-global.component.scss']
})
export class IngredientGlobalComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.data.getIngredientsUser().subscribe( response =>
      this.ingredients=response
    );
  }

}
