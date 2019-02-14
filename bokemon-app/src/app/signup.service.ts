import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, observable, of} from 'rxjs';
import { Player} from './Player';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  saveUser(player: Player) {
    return this.http.post( 'http://localhost:8080/player',
      player).pipe(catchError(this.handleError<Player>( 'saveUser')));
  }

  findAll(): Observable<Player[]> {
    return this.http.get<any>('http://localhost:8080/player').pipe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}


