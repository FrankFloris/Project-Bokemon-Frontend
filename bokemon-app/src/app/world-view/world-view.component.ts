import {Component, Input, OnInit} from '@angular/core';
import {WorldMapService} from '../world-map.service';
import {WorldMap} from '../WorldMap';
import {WorldView} from '../WorldView';
import {TileService} from '../tile.service';
import {Tile} from '../Tile';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

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

  testSting: string;

  // @Input()
  // logOutPage: WorldViewComponent;
  //
  // public logOutPage = this.fb.group({
  // });

  constructor(private worldMapService: WorldMapService, private tileService: TileService, private router: Router) { }

  ngOnInit() {
    this.worldView = new WorldView(2, 2);
    this.getWorldMap();
    //this.viewNumbers = this.worldView.getViewNumbers(5, 0, this.worldMap);

  }

  getTiles(): void {
    this.tileService
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
