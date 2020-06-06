import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Recette} from "../../models/recette";
import {FeedbackService} from "./feedback.service";
import {User} from "../../models/user";
import {Calendrier} from "../../models/calendrier";
import {Ingredient} from "../../models/ingredient";
import {Allergene} from "../../models/allergene";
import {PreferenceAlim} from '../../models/preferenceAlim';

const headers = new HttpHeaders().set('Accept', 'application/json');
const params = new HttpParams();
const urlEnv =`${environment.apiUrl}`;

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private feedbackService: FeedbackService) { }

/////////////////////////////////////////////////////////////////////////////////////
  // endpoints des recettes
/////////////////////////////////////////////////////////////////////////////////////
  getRecettesService(): Observable<Recette[]> {
    return this.http.get<Recette[]>(`${environment.apiUrl}/recettes/`, {params, headers}).pipe(
      tap(_ => console.log('recuperation liste de recette')), // TODO remove console
      catchError(this.feedbackService.handleError<Recette[]>('getRecettesService', []))
    );
  }

  getRecettesByIdService(id: number): Observable<Recette> {
    return this.http.get<Recette>(`${environment.apiUrl}/recettes/${id}`, {params, headers}).pipe(
      tap(_ => console.log('recuperation d\'une recette')), // TODO console.log
      catchError(this.feedbackService.handleError<Recette>('getRecettesByIdService', ))
    );
  }

  getRecettesByUserAndContext():Observable<Recette[]>{
    return this.http.get<Recette[]>(urlEnv+'/recettes/datesuser',{params, headers}).pipe(
      tap(_ => console.log('recuperation liste de recette user de toutes les dates selectionner')), // TODO remove console
      catchError(this.feedbackService.handleError<Recette[]>( 'getRecettesService', []))
    );
  }

  deleteRecette(id: number): Observable<any> {
    let url = `${environment.apiUrl}/recettes/${id.toString()}`;
    return this.http.delete(url, {headers, params}).pipe(
      tap(_ => this.feedbackService.info.next(`user ${id} deleted`)),
      catchError(this.feedbackService.handleError<any>('deleteUser'))
    );
  }

/////////////////////////////////////////////////////////////////////////////////////
  //endpoints des users
/////////////////////////////////////////////////////////////////////////////////////
  getUserByUsernameService(username: string): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/username/${username}`, {params, headers}).pipe(
      tap( _ => console.log('recuperation d\'un user')), //TODO console.log
      catchError(this.feedbackService.handleError<User>('getUserByUsernameService'))
    )
  }

  updateUserService(user: User):Observable<User>{
    return this.http.put<User>(`${environment.apiUrl}/auth/update`,user, {params, headers}).pipe(
      tap( _ => console.log('recuperation d\'un user')), //TODO console.log
      catchError(this.feedbackService.handleError<User>('update User'))
    )
  }

/////////////////////////////////////////////////////////////////////////////////////
//endpoints des calendriers
/////////////////////////////////////////////////////////////////////////////////////
  getCalendriersService(): Observable<Calendrier[]> {
    return this.http.get<Calendrier[]>(`${environment.apiUrl}/calendrierrecettes/`, {params, headers}).pipe(
      tap(_ => console.log('recuperation liste de calendrier')), // TODO remove console
      catchError(this.feedbackService.handleError<Calendrier[]>('getCalendrierService', []))
    );
  }

  //recupere une liste de calendrier par date de l'user logger
  getCalendriersByDateService(calendrier: Calendrier): Observable<Calendrier[]> {

    return this.http.post<Calendrier[]>(`${environment.apiUrl}/calendrierrecettes/date/`,calendrier,{params, headers}).pipe(
      tap(_ => console.log('recuperation liste de calendrier')), // TODO remove console
      catchError(this.feedbackService.handleError<Calendrier[]>('getCalendrierService', []))
    );
  }

  getCalendriersByUserService(): Observable<Calendrier[]> {
    return this.http.get<Calendrier[]>(`${environment.apiUrl}/calendrierrecettes/users/`, {params, headers}).pipe(
      tap(_ => console.log('recuperation liste de calendrier')), // TODO remove console
      catchError(this.feedbackService.handleError<Calendrier[]>('getCalendrierService', []))
    );
  }

  saveCalendrierService(date,idRecette?:string): Observable<Calendrier>{
    if(date.idCalendrier){
      console.log('update')
      const url = `${environment.apiUrl}/calendrierrecettes?id=${idRecette.toString()}`;
      return this.http.put<Calendrier>(url,date, {headers, params}).pipe(
        tap(_ => this.feedbackService.info.next(`calendrier mis à jour`)),
        catchError(this.feedbackService.handleError<Calendrier>('upadteCalendrier'))
      );
    }else{
      console.log('save')
      const url=`${environment.apiUrl}/calendrierrecettes/${idRecette.toString()}`;
      return this.http.post<Calendrier>(url,date, {params,headers}).pipe(
      tap(_ => this.feedbackService.info.next(`calendrier créer`)), // TODO remove console
      catchError(this.feedbackService.handleError<Calendrier>('saveCalendrierService'))
    )}
  }

  deleteCalendrier(calendrier:Calendrier) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: calendrier };

    let url = `${environment.apiUrl}/calendrierrecettes/`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.feedbackService.info.next(`date ${calendrier.date} deleted`)),
      catchError(this.feedbackService.handleError<any>('deleteCalendrier'))
    );
  }

  deleteCalendrierInit(){
    return this.http.delete(urlEnv+'/calendrierrecettes/init',{params, headers}).pipe(
      tap(_ => this.feedbackService.info.next(`all date before today deleted`)),
      catchError(this.feedbackService.handleError<any>('initDeleteCalendrier'))
    );
  }

/////////////////////////////////////////////////////////////////////////////////////
//endpoints des ingrédients
/////////////////////////////////////////////////////////////////////////////////////
  getIngredientsUser(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.apiUrl}/ingredients/user`, {params, headers}).pipe(
      catchError(this.feedbackService.handleError<Ingredient[]>('getIngredients', []))
    );
  }

  getIngredientByIdService(id: string): Observable<Recette> {
    return this.http.get<Recette>(`${environment.apiUrl}/recette/${id}`, {params, headers}).pipe(
      tap(_ => console.log('recuperation d\'une recette')), // TODO remove console
      catchError(this.feedbackService.handleError<Recette>('getRecettesByIdService'))
    );
  }

/////////////////////////////////////////////////////////////////////////////////////
//endpoints des allergenes
/////////////////////////////////////////////////////////////////////////////////////
  getAllergene(): Observable<Allergene[]>{
    return this.http.get<Allergene[]>(`${environment.apiUrl}/allergenes/`, {params, headers}).pipe(
      catchError(this.feedbackService.handleError<Allergene[]>('getAllergene', []))
    );
  }

  updateAllergenesService(allergenes:Allergene[]):Observable<Allergene[]> {

    const url = `${environment.apiUrl}/allergenes/`;
    return this.http.post<Allergene[]>(url, allergenes, {headers, params}).pipe(
      tap(_ => this.feedbackService.info.next(`allergene mise à jour`)),
      catchError(this.feedbackService.handleError<Allergene[]>('updateAllergenes'))
    );
  }


/////////////////////////////////////////////////////////////////////////////////////
//endpoints des preferences
/////////////////////////////////////////////////////////////////////////////////////
  getPreferences(): Observable<PreferenceAlim[]>{
    return this.http.get<PreferenceAlim[]>(`${environment.apiUrl}/preferences/`, {params, headers}).pipe(
      catchError(this.feedbackService.handleError<PreferenceAlim[]>('getPreferences', []))
    );
  }

  updatePreferencesService(Preferences:PreferenceAlim[]):Observable<PreferenceAlim[]> {

    const url = `${environment.apiUrl}/preferences/`;
    return this.http.put<PreferenceAlim[]>(url, Preferences, {headers, params}).pipe(
      tap(_ => this.feedbackService.info.next(`preference mise à jour`)),
      catchError(this.feedbackService.handleError<PreferenceAlim[]>('updatePreferences'))
    );
  }

}
