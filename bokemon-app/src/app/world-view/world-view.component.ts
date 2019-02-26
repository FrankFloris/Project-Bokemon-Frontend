import {Component, Input, OnInit} from '@angular/core';
import {WorldMapService} from '../world-map.service';
import {WorldMap} from '../WorldMap';
import {TileService} from '../tile.service';
import {Tile} from '../Tile';

import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {HostListener} from "@angular/core";

import {TileMap} from "../TileMap";
import {PlayerService} from "../player.service";
import {Player} from "../Player";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-world-view',
  templateUrl: './world-view.component.html',
  styleUrls: ['./world-view.component.css'],

  host: {
    '(document:keydown)': 'onKey($event)'
  }
})
export class WorldViewComponent implements OnInit{

  player: Player;

  tileMap: TileMap;
  spriteView: string[][];
  encounter: boolean = false;

  testSting: string;

  constructor(
    private worldMapService: WorldMapService,
    private tileService: TileService,
    private playerService: PlayerService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPlayerAndTileMap();
    //this.getPlayer();
    //this.getTileMap();
  }


  public closeOverlay(): void {
    this.encounter = false;
  }

  public onEncounter(): void {
    this.encounter = true;
  }

  movePlayerUpdate(dx:number, dy: number): void {
    this.movePlayer(dx, dy);
  }

  movePlayer(dx: number, dy: number): void {
    // Don't execute if the player has a battle request
    if (this.encounter) { return; }

    let xPos = this.player.x + dx;
    let yPos = this.player.y + dy;
    if (this.tileMap.isMoveable(xPos, yPos)) {
      this.player.x += dx;
      this.player.y += dy;
      this.spriteView = this.tileMap.getViewSprites(this.player.x, this.player.y, 6, 6, this.player.sprite);
      this.playerService.updatePlayer(this.player).subscribe(()=>{console.log("CHECK")})
      if (this.tileMap.hasBokemon(xPos, yPos)) {
        if ((Math.floor(Math.random()*10)+1) == 1) {
          this.onEncounter();
        }
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

  onKey(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        this.movePlayer(0,-1);
        break;
      case "ArrowDown":
        this.movePlayer(0, 1);
        break;
      case "ArrowLeft":
        this.movePlayer(-1, 0);
        break;
      case "ArrowRight":
        this.movePlayer(1, 0);
        break;
    }
  }

  getPlayer(): void {
    console.log("test");

    this.authenticationService.update()
      .subscribe(() => {
        this.player = this.authenticationService.currentPlayer;
      })
  }

  getPlayerAndTileMap(): void {
    console.log("test");

    this.authenticationService.update()
      .subscribe(() => {
        this.player = this.authenticationService.currentPlayer;
        this.getTileMap();
      })
  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['login-page'])
  }

  enterBattle() {
    this.encounter = false;
    this.router.navigate(['world-view/battle-view'])
  }
}
