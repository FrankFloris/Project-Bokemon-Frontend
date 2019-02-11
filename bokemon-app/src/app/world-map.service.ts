import { Injectable } from '@angular/core';
import {WorldMap} from './WorldMap';
import {TEMPTY, MAP} from './mock-map';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorldMapService {

  constructor() { }

  getWorldMap(): Observable<WorldMap> {
    return of(new WorldMap(MAP, TEMPTY));
  }
}
