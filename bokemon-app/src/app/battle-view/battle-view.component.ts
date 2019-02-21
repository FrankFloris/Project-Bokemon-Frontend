import { Component, OnInit } from '@angular/core';
import {Bokemon} from '../bokemon';
import {BokemonTemplateService} from '../bokemon-template.service';
import {BokemonService} from '../bokemon.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {Player} from '../Player';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-battle-view',
  templateUrl: './battle-view.component.html',
  styleUrls: ['./battle-view.component.css']
})
export class BattleViewComponent implements OnInit {

  constructor(
    private bokemonService: BokemonService,
    private templateService: BokemonTemplateService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private playerService: PlayerService
  ) { }

  player: Player;
  wildBokemon: Bokemon;
  playerBokemon: Bokemon;

  ngOnInit() {
    this.createWildBokemon();
    this.getPlayerBokemon();
    this.getPlayer();
  }

  createWildBokemon(): void {
    this.templateService.findAll().subscribe(bokemonTemplates => {
      let temp = bokemonTemplates[(Math.floor(Math.random()*bokemonTemplates.length))]; // frank
      this.wildBokemon = new Bokemon(0, temp, (Math.floor(Math.random()*5)+1));   // lvl ook random maken
    });
  }

  private getPlayer() {
    this.player = this.authenticationService.currentPlayer;
  }

  private getPlayerBokemon(){
    this.playerBokemon = this.authenticationService.currentPlayer.bokemon;
  }

  attackBokemon() {
    if (this.playerBokemon.spd >= this.wildBokemon.spd) {
      let damageToWildBokemon = Math.round(this.playerBokemon.atk * (100 / (100 + this.wildBokemon.def)));
      this.wildBokemon.hp -= damageToWildBokemon;
      if (this.wildBokemon.hp <= 0){
        window.alert("YOU ARE VICTORIOUS!!!")
        this.levelUp();
        // this.player.bokemon.lvl += 1;
        this.player.bokemon.maxHp = this.player.bokemon.template.baseHp + this.player.bokemon.template.deltaHp*this.player.bokemon.lvl;
        this.player.bokemon.setStatsByLevel();
        // this.authenticationService.currentPlayer.bokemon.lvl += 1;
        // this.playerService.updatePlayer(this.player).subscribe(()=>{console.log("CHECK")})
        this.bokemonService.updateBokemon(this.player.bokemon).subscribe(()=>{console.log("BOKE")})
        }
      else {
        let damageToPlayerBokemon = Math.round(this.wildBokemon.atk * (100 / (100 + this.playerBokemon.def)));
        this.playerBokemon.hp -= damageToPlayerBokemon;
        if (this.playerBokemon.hp <= 0){
          window.alert("YOUR BOKEMON HAS DIED!!!")
        }
      }
    }
    else {
      let damageToPlayerBokemon = Math.round(this.wildBokemon.atk * (100 / (100 + this.playerBokemon.def)));
      this.playerBokemon.hp -= damageToPlayerBokemon;
      if (this.playerBokemon.hp <= 0){
        window.alert("YOUR BOKEMON HAS DIED!!!")
      }
      else {
        let damageToWildBokemon = Math.round(this.playerBokemon.atk * (100 / (100 + this.wildBokemon.def)));
        this.wildBokemon.hp -= damageToWildBokemon;
        if (this.wildBokemon.hp <= 0){
          window.alert("YOU ARE VICTORIOUS!!!")
          this.player.bokemon.lvl += 1;
          this.player.bokemon.setStatsByLevel();
          // this.authenticationService.currentPlayer.bokemon.lvl += 1;
          // this.playerService.updatePlayer(this.player).subscribe(()=>{console.log("CHECK")})
          this.bokemonService.updateBokemon(this.player.bokemon).subscribe(()=>{console.log("BOKE")})
        }
      }
    }
  }
  levelUp() {

  }

  useItem() {
    console.log("You cannot use items yet")
  }

  catchBokemon() {
    console.log("You cannot catch Bokemon yet")
  }

  run() {
    this.router.navigate(['world-view'])
  }

}
