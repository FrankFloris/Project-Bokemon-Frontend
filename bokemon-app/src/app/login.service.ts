import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, observable} from 'rxjs';
import { Player} from './Player';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentPlayerId: number;


  login(username: string, password: string){

  }

  logout(){

  }

  isLoggedIn(): boolean{
    return true;
  }

  constructor(private http: HttpClient) {
  }

  getUserDetails(username, password) {

  }

  verifyUser(username: any, password: any) {
    return this.http.post('/DE URL', {
      username,
      password
    }).subscribe()
  }

  authenticate(player: Player) {
    return this.http.post('http://localhost:8080/authenticate', player).pipe(); //(
    //catchError(this.handleError<Player>)
  }

}
