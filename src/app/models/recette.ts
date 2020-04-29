import {Etapes} from "./etapes";
import {Calendrier} from "./calendrier";
import {Ingredient} from "./ingredient";

export interface Recette {
  idRecette: number;
  name: string;
  calorie: number;
  tempPreparation: number;
  tempCuisson: number;
  userList: [],
  etapes: Array<Etapes>;
  calendrier: Array<Calendrier>;
  ingredients:Array<Ingredient>;
}


