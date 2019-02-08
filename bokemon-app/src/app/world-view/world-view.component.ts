import { Component, OnInit } from '@angular/core';
import { MAP} from '../mock-map';
import {WorldMapService} from '../world-map.service';
import {WorldMap} from '../WorldMap';

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css']
})
export class WorldViewComponent implements OnInit {

  view: string[][]; // 2D array of URLs, representing the tiles in view.
  worldMap: WorldMap;

  constructor(private worldMapService: WorldMapService) { }

  ngOnInit() {
    this.getWorldMap();
    this.view = this.worldMap.urls;
  }

  getWorldMap(): void {
    this.worldMapService.getWorldMap()
      .subscribe(worldMap => this.worldMap = worldMap);
  }

}
