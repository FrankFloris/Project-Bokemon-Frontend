import {Component, Input, OnInit} from '@angular/core';
import {WorldMapService} from '../world-map.service';
import {WorldMap} from '../WorldMap';
import {WorldView} from '../WorldView';
import {TileService} from '../tile.service';
import {Tile} from '../Tile';

import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

import {TileMap} from "../TileMap";


@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css']
})
export class WorldViewComponent implements OnInit {
  worldMap: WorldMap;
  worldView: WorldView;
  viewNumbers: number[][];
  viewTiles: Tile[][];
  currentPlayer: string = localStorage.getItem("player");

  tileMap: TileMap;
  tileView: Tile[][];

  testSting: string;

  // @Input()
  // logOutPage: WorldViewComponent;
  //
  // public logOutPage = this.fb.group({
  // });

  constructor(private worldMapService: WorldMapService, private tileService: TileService, private router: Router) { }

  ngOnInit() {
    this.getTileMap();
  }

  getTileMap(): void {
    this.worldMapService.findById(7)
      .subscribe(worldMap => {
        this.tileService.findAll()
          .subscribe(tiles => {
            this.tileMap = new TileMap(tiles, worldMap);
            this.tileView = this.tileMap.getView(0, 0, 3, 3);
          });
      });
  }


  logOut(){
    localStorage.setItem("player", "");
    this.router.navigate(['login-page'])
  }

  getWorldMap(): void {
    this.worldMapService.findById(7)
      .subscribe(worldMap => {
        this.worldMap = worldMap;
        this.viewNumbers = this.worldView.getViewNumbers(7, 4, worldMap);

        this.viewTiles = [];
        for (let y = 0; y < this.viewNumbers.length; y++) {
          this.viewTiles[y] = [];
          for (let x = 0; x < this.viewNumbers[0].length; x++) {
            this.tileService.findById(this.viewNumbers[y][x]).subscribe( tile => {
              this.viewTiles[y][x] = tile;
            });
          }
        }
      });
  }

}
