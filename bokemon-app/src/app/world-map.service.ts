import { Injectable } from '@angular/core';
import {WorldMap} from './WorldMap';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorldMapService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<WorldMap[]> {
    return this.http.get<any>('http://localhost:8080/worldMap').pipe(
      catchError(this.handleError<WorldMap>('findAll'))
    );
  }

  findById(id: number): Observable<WorldMap> {
    return this.http.get<any>('http://localhost:8080/worldMap/' + id).pipe(
      catchError(this.handleError<WorldMap>('findById'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
