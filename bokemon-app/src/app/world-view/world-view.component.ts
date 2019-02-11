import { Component, OnInit } from '@angular/core';
import {WorldMapService} from '../world-map.service';
import {WorldMap} from '../WorldMap';
import {WorldView} from '../WorldView';

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css']
})
export class WorldViewComponent implements OnInit {

  view: string[][]; // 2D array of URLs, representing the tiles in view.
  worldMap: WorldMap;
  worldView: WorldView;

  testSting: string;

  constructor(private worldMapService: WorldMapService) { }

  ngOnInit() {
    this.getWorldMap();
    this.worldView = new WorldView(1, 1);
    this.view = this.worldView.getViewUrls(0, 0, this.worldMap);
  }

  getWorldMap(): void {
    this.worldMapService.getWorldMap()
      .subscribe(worldMap => this.worldMap = worldMap);
  }

}
