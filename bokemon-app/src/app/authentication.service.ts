import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Player} from "./Player";
import {map} from "rxjs/operators";
import {LoginForm} from "./LoginForm";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentPlayer: Player;

  constructor(private http: HttpClient) {
    this._currentPlayer = JSON.parse(localStorage.getItem('currentPlayer'));
  }

  get currentPlayer(): Player {
    return this._currentPlayer;
  }

  update(): Observable<Player> {
    return this.http.get<any>('http://localhost:8080/player/' + this._currentPlayer.id)
      .pipe(map(player => {
        if (player) {
          localStorage.setItem('currentPlayer', JSON.stringify(player));
          this._currentPlayer = player;
        }

        return player;
      }));
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8080/login', new LoginForm(username, password))
      .pipe(map(player => {
          if (player) {
            localStorage.setItem('currentPlayer', JSON.stringify(player));
            this._currentPlayer = player;
          }

          return player;
      }));
  }

  logout() {
    localStorage.removeItem('currentPlayer');
    this._currentPlayer = null;
  }


}
