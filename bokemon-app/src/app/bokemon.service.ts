import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Bokemon} from './bokemon';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {BokemonTemplateService} from './bokemon-template.service';
import {BokemonTemplate} from './bokemonTemplate';


@Injectable({
  providedIn: 'root'
})
export class BokemonService {

  constructor(private http: HttpClient, private bokemonTemplateService: BokemonTemplateService) { }



  createBokemon(bokemon: Bokemon) : Observable<Bokemon>{
    //Observable<BokemonTemplate> list =
    return this.http.post<Bokemon>( 'http://localhost:8080/bokemon',
      bokemon);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


  updateBokemon(bokemon: Bokemon): Observable<Bokemon> {
    return this.http.patch<Bokemon>('http://localhost:8080/bokemon/', bokemon).pipe();
  }
}
