import {Recette} from './recette';

export interface CalendrierRecette {
  idCalendrier: number;
  date: number ;
  recette: Recette;
}
