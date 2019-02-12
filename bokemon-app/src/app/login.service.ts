import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { observable} from 'rxjs';
import { Player} from './Player';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUserDetails(username, password) {

  }


  verifyUser(username: any, password: any) {
    return this.http.post('/DE URL', {
      username,
      password
    }).subscribe()
  }
}

  // saveUser(player: Player) {
  // return this.http.post( 'http://localhost:4200/login-page',
  //   player).pipe(catchError(this.handleError<Player>( 'saveUser')));
// }
