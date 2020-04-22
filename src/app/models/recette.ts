export interface Recette {
  idRecette: number;
  name: string;
  calorie: number;
  tempPreparation: number;
  tempCuisson: number;
  etapes: [];
  calendrierRecette: [];
}
