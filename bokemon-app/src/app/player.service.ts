import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from "./Player";
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Tile} from "./Tile";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  findByUsername(username: string): Observable<Player> {
    return this.http.get<any>('http://localhost:8080/username/' + username).pipe(
      catchError(this.handleError<Tile>('findAll'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

