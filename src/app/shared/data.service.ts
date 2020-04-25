import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Recette} from "../models/recette";
import {FeedbackService} from "./feedback.service";

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable()
export class DataService {


  constructor(private http: HttpClient, private feedbackService: FeedbackService) {
  }


  getRecettesService(): Observable<Recette[]> {
    const params = new HttpParams();
    return this.http.get<Recette[]>(`${environment.apiUrl}/recette/findall`, {params, headers}).pipe(
      tap(_ => console.log('recuperation liste de recette')), // TODO remove console
      catchError(this.feedbackService.handleError<Recette[]>('getRecettesService', []))
    );
  }

  getRecettesByIdService(id: string): Observable<Recette> {
    const params = new HttpParams();
    return this.http.get<Recette>(`${environment.apiUrl}/recette/${id}`, {params, headers}).pipe(
      tap(_ => console.log('recuperation d\'une recette')), // TODO remove console
      catchError(this.feedbackService.handleError<Recette>('getRecettesByIdService', ))
    );
  }

  deleteRecette(id: number): Observable<any> {
    let params = new HttpParams();
    let url = `${environment.apiUrl}/recette/${id.toString()}`;
    return this.http.delete(url, {headers, params}).pipe(
      tap(_ => this.feedbackService.info.next(`user ${id} deleted`)),
      catchError(this.feedbackService.handleError<any>('deleteUser'))
    );
  }
}

