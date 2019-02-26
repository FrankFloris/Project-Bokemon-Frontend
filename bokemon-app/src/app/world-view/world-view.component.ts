import {Component, Input, OnInit} from '@angular/core';
import {WorldMapService} from '../world-map.service';
import {WorldMap} from '../WorldMap';
import {TileService} from '../tile.service';
import {Tile} from '../Tile';

import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

import {TileMap} from "../TileMap";
import {PlayerService} from "../player.service";
import {Player} from "../Player";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css']
})
export class WorldViewComponent implements OnInit{

  player: Player;

  tileMap: TileMap;
  spriteView: string[][];
  overlay: boolean = false;

  testSting: string;

  constructor(
    private worldMapService: WorldMapService,
    private tileService: TileService,
    private playerService: PlayerService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPlayer();
    this.getTileMap();
  }

  public closeOverlay(): void {
    this.overlay = false;
  }

  public onEncounter(): void {
    this.overlay = true;
  }

  movePlayerUpdate(dx:number, dy: number): void {
    this.movePlayer(dx, dy);
  }

  movePlayer(dx: number, dy: number): void {
    let xPos = this.player.x + dx;
    let yPos = this.player.y + dy;
    if (this.tileMap.isMoveable(xPos, yPos)) {
      this.player.x += dx;
      this.player.y += dy;
      this.spriteView = this.tileMap.getViewSprites(this.player.x, this.player.y, 6, 6, this.player.sprite);
      this.playerService.updatePlayer(this.player).subscribe(()=>{console.log("CHECK")})
      if (this.tileMap.hasBokemon(xPos, yPos)) {
        this.onEncounter();
      }
    }
  }

  getTileMap(): void {
    this.worldMapService.findById(7)
      .subscribe(worldMap => {
        this.tileService.findAll()
          .subscribe(tiles => {
            this.tileMap = new TileMap(tiles, worldMap);
            //this.tileView = this.tileMap.getView(this.player.x, this.player.y, 3, 3);
            this.spriteView = this.tileMap.getViewSprites(this.player.x, this.player.y, 6, 6, this.player.sprite);
          });
      });
  }

  getPlayer(): void {
    this.player = this.authenticationService.currentPlayer;

  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['login-page'])
  }

  enterBattle() {
    this.router.navigate(['world-view/battle-view'])
  }
}
