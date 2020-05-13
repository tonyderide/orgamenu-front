import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {Recette} from "../../models/recette";
import {FeedbackService} from "./feedback.service";
import {User} from "../../models/user";
import {Calendrier} from "../../models/calendrier";

const headers = new HttpHeaders().set('Accept', 'application/json');
const params = new HttpParams();
const urlEnv =`${environment.apiUrl}`;
@Injectable()
export class DataService {

  constructor(private http: HttpClient, private feedbackService: FeedbackService) {
  }
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

  getRecettesByUserAndUsercontext():Observable<Recette[]>{
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
  getUserByIDService(id: number): Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`, {params, headers}).pipe(
      tap( _ => console.log('recuperation d\'un user')), //TODO console.log
      catchError(this.feedbackService.handleError<User>('getUserByIDService'))
    )
  }

/////////////////////////////////////////////////////////////////////////////////////
  //endpoints des Ingrédients
  getIngredientByIdService(id: string): Observable<Recette> {
    return this.http.get<Recette>(`${environment.apiUrl}/recette/${id}`, {params, headers}).pipe(
      tap(_ => console.log('recuperation d\'une recette')), // TODO remove console
      catchError(this.feedbackService.handleError<Recette>('getRecettesByIdService' ))
    );
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
      const url = `${environment.apiUrl}/calendrierrecettes/${idRecette.toString()}`;
      return this.http.put<Calendrier>(url,date, {headers, params}).pipe(
        tap(_ => this.feedbackService.info.next(`calendrier mis à jour`)),
        catchError(this.feedbackService.handleError<Calendrier>('saveCalendrierService'))
      );
    }else{
      const url=`${environment.apiUrl}/calendrierrecettes/${idRecette.toString()}`;
      return this.http.post<Calendrier>(url,date, {params,headers}).pipe(
      tap(_ => this.feedbackService.info.next(`calendrier créer`)), // TODO remove console
      catchError(this.feedbackService.handleError<Calendrier>('saveCalendrierService'))
    )}
  }

  deleteCalendrier(calendrier:Calendrier) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: calendrier };

    let url = `${environment.apiUrl}/calendrierrecettes/`;
    return this.http.delete(url,httpOptions).pipe(
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
}
