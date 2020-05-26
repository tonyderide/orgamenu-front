import {Recette} from "./recette";

export interface User {

  id?: number;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  size?: number;
  weight?: number;
  age?: number;
  sexe?: number;
  roles?: [];
  recettes?:Recette[];
}
