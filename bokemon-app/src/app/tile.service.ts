import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {WorldMap} from './WorldMap';
import {catchError} from 'rxjs/operators';
import {Tile} from './Tile';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Tile[]> {
    return this.http.get<any>('http://localhost:8080/tile').pipe(
      catchError(this.handleError<Tile>('findAll'))
    );
  }

  findById(id: number): Observable<Tile> {
    return this.http.get<any>('http://localhost:8080/tile/' + id).pipe(
      catchError(this.handleError<Tile>('findById'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
