import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BokemonTemplate} from './bokemonTemplate';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BokemonTemplateService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<BokemonTemplate[]>{
    return this.http.get<any>('http://localhost:8080/monsterTemplate');
  }

}
