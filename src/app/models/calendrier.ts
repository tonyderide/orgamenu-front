import {Recette} from "./recette";
import {User} from "./user";

export interface Calendrier {
  idCalendrier?: number;
  date: string ;
  recettes?: Recette[];
  user?: User;
}
