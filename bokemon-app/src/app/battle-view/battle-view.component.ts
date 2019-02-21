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
  battleText: string;

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
    this.battleText = "";
    if (this.playerBokemon.spd >= this.wildBokemon.spd) {
      this.attackWildBokemon();
      this.checkRemainingHitpoints();
      if (this.wildBokemon.hp > 0) {
        this.attackPlayerBokemon();
        this.checkRemainingHitpoints();
      }
    }
    else {
      this.attackPlayerBokemon();
      this.checkRemainingHitpoints();
      if (this.playerBokemon.hp > 0) {
        this.attackWildBokemon();
        this.checkRemainingHitpoints();
      }
    }
  }

  attackWildBokemon(){
    let damageToWildBokemon = Math.round(this.playerBokemon.atk * (100 / (100 + this.wildBokemon.def)));
    this.wildBokemon.hp -= damageToWildBokemon;
    this.battleText += ('<div>' + "Your " + this.playerBokemon.name + " dealt " +
      damageToWildBokemon + " damage to the wild " + this.wildBokemon.name +
      ". It has " + this.wildBokemon.hp + " hitpoints left" + '</div>');
  }

  attackPlayerBokemon(){
    let damageToPlayerBokemon = Math.round(this.wildBokemon.atk * (100 / (100 + this.playerBokemon.def)));
    this.playerBokemon.hp -= damageToPlayerBokemon;
    this.battleText += ('<div>' + "Wild " + this.wildBokemon.name + " dealt " +
      damageToPlayerBokemon + " damage to your " + this.playerBokemon.name +
      ". It has " + this.playerBokemon.hp + " hitpoints left" + '</div>');
  }

  checkRemainingHitpoints(){
    if (this.wildBokemon.hp <= 0){
      window.alert("YOU ARE VICTORIOUS!!! LEVEL UP!")
      this.levelUp();
      this.bokemonService.updateBokemon(this.player.bokemon).subscribe(()=>{console.log("BOKE")})
      this.router.navigate(['world-view'])
    }
    else if (this.playerBokemon.hp <= 0){
      window.alert("YOUR BOKEMON HAS DIED!!!")
      this.router.navigate(['login-page'])
    }
  }

  levelUp() {
    this.player.bokemon.lvl += 1;
    this.player.bokemon.maxHp = this.player.bokemon.template.baseHp +
      this.player.bokemon.template.deltaHp*this.player.bokemon.lvl;
    this.player.bokemon.hp = this.player.bokemon.template.baseHp +
      this.player.bokemon.template.deltaHp*this.player.bokemon.lvl;
    this.player.bokemon.atk = this.player.bokemon.template.baseAtk +
      this.player.bokemon.template.deltaAtk*this.player.bokemon.lvl;
    this.player.bokemon.def = this.player.bokemon.template.baseDef +
      this.player.bokemon.template.deltaDef*this.player.bokemon.lvl;
    this.player.bokemon.spd = this.player.bokemon.template.baseSpd +
      this.player.bokemon.template.deltaSpd*this.player.bokemon.lvl;
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
