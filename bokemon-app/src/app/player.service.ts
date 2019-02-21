import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Player} from "./Player";
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Tile} from "./Tile";
import {Bokemon} from "./bokemon";
import {BokemonService} from "./bokemon.service";
import {BokemonTemplateService} from "./bokemon-template.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http: HttpClient,
    private bokemonService: BokemonService,
    private bokemonTemplateService: BokemonTemplateService
  ) { }

  createPlayer(player: Player) {
    console.log("reached 'createPlayer");
    return this.http.post<any>('http://localhost:8080/player', player).pipe(
      catchError(this.handleError<Player>(`createPlayer`))
    );
  }

  findByUsername(username: string): Observable<Player[]> {
    return this.http.get<any>('http://localhost:8080/username/' + username).pipe(
      catchError(this.handleError<Player>('findAll'))
    )
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.patch<Player>('http://localhost:8080/player/', player).pipe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

