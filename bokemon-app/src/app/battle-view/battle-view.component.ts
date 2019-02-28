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
  styleUrls: ['./battle-view.component.css'],

  host: {
    '(document:keydown)': 'onKey($event)'
  }
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
  private message: string;



  ngOnInit() {
    this.createWildBokemon();
    this.getPlayerBokemon();
    this.getPlayer();
  }

  createWildBokemon(): void {
    this.templateService.findAll().subscribe(bokemonTemplates => {
      let temp = bokemonTemplates[(Math.floor(Math.random()*bokemonTemplates.length))]; // frank
      this.wildBokemon = new Bokemon(0, temp, this.getRandomLevel(this.playerBokemon.lvl));
    });
  }

  private getPlayer() {
    this.player = this.authenticationService.currentPlayer;
  }

  private getPlayerBokemon(){
    this.playerBokemon = this.authenticationService.currentPlayer.bokemons[0];
  }

  onKey(event: KeyboardEvent){
    switch (event.key){
      case "1":
        this.attackBokemon();
        break;
      case "2":
        this.useItem();
        break;
      case "3":
        this.tryCatchBokemon();
        break;
      case "4":
        this.run();
        break;
    }
  }

  attackBokemon() {
    this.battleText = "";
    if (this.playerBokemon.spd >= this.wildBokemon.spd) {
      this.attackWildBokemon();
      if (this.wildBokemon.hp > 0) {
        this.attackPlayerBokemon();
      }
    }
    else {
      this.attackPlayerBokemon();
      if (this.playerBokemon.hp > 0) {
        this.attackWildBokemon();
      }
    }
  }

  attackWildBokemon(){
    let damageToWildBokemon = Math.round(this.playerBokemon.atk * ((Math.floor(Math.random()*10)+95) / (100 + this.wildBokemon.def))* this.calculateCritModifier());
    this.wildBokemon.hp -= damageToWildBokemon;
    this.battleText += ('<div>' + this.message + "Your " + this.playerBokemon.name + " dealt " +
      damageToWildBokemon + " damage to the wild " + this.wildBokemon.name +
      ". It has " + this.wildBokemon.hp + " hitpoints left" + '</div>');
    this.checkRemainingHitpoints();
  }

  attackPlayerBokemon(){
    let damageToPlayerBokemon = Math.round(this.wildBokemon.atk * ((Math.floor(Math.random()*10)+95) / (100 + this.playerBokemon.def)) * this.calculateCritModifier());
    this.playerBokemon.hp -= damageToPlayerBokemon;
    this.battleText += ('<div>' + this.message + "Wild " + this.wildBokemon.name + " dealt " +
      damageToPlayerBokemon + " damage to your " + this.playerBokemon.name +
      ". It has " + this.playerBokemon.hp + " hitpoints left" + '</div>');
    this.checkRemainingHitpoints();
  }

  checkRemainingHitpoints(){
    if (this.wildBokemon.hp <= 0){
      window.alert("YOU ARE VICTORIOUS!!! LEVEL UP!");
      this.levelChange(1);
      this.savingBokemon();
    }
    else if (this.playerBokemon.hp <= 0){
      this.levelChange(-2);
      this.savingBokemon();
      this.player.x = 8;
      this.player.y = 73;
      this.playerService.updatePlayer(this.player).subscribe(()=>{console.log("positie update")});
      window.alert("YOUR BOKEMON HAS DIED!!! Level -2 and back to start!");
      this.goBackToWorld();
    }
  }

  levelChange(modifier: number) {
    this.player.bokemons[0].lvl += modifier;
    if (this.player.bokemons[0].lvl < 5){
      this.player.bokemons[0].lvl = 5;
    }
    this.player.bokemons[0].maxHp = this.player.bokemons[0].template.baseHp +
      this.player.bokemons[0].template.deltaHp*this.player.bokemons[0].lvl;
    this.player.bokemons[0].hp = this.player.bokemons[0].template.baseHp +
      this.player.bokemons[0].template.deltaHp*this.player.bokemons[0].lvl;
    this.player.bokemons[0].atk = this.player.bokemons[0].template.baseAtk +
      this.player.bokemons[0].template.deltaAtk*this.player.bokemons[0].lvl;
    this.player.bokemons[0].def = this.player.bokemons[0].template.baseDef +
      this.player.bokemons[0].template.deltaDef*this.player.bokemons[0].lvl;
    this.player.bokemons[0].spd = this.player.bokemons[0].template.baseSpd +
      this.player.bokemons[0].template.deltaSpd*this.player.bokemons[0].lvl;
  }

  calculateCritModifier(): number {
    if ((Math.floor(Math.random()*5)+1) == 1){
      this.message = "Critical hit!!! ";
      return 1.5;
    } else {
      this.message= "";
      return 1;}}

  useItem() {
    this.battleText = "";
    this.battleText = "You don't have any items!";
  }

  tryCatchBokemon(){
    this.battleText = "";
    if (this.wildBokemon.hp/this.wildBokemon.maxHp < 0.3 ){
      this.catchBokemon();
    }
    else if (this.wildBokemon.hp/this.wildBokemon.maxHp < 0.6 ){
      if ((Math.floor(Math.random()*2)+1) == 1){
        this.catchBokemon();
      }
      else {
        this.battleText += "Almost got it, but now the wild 🅱okemon is angry!";
        this.attackPlayerBokemon();
      }
    }
    else {
      if ((Math.floor(Math.random()*7)+1) == 1){
        this.catchBokemon();
      }
      else {
        this.battleText += "The wild 🅱okemon is still too healty, and now it's angry!";
        this.attackPlayerBokemon();
      }
    }
  }

  catchBokemon() {
    window.alert("Congratulations! You have caught the wild " + this.wildBokemon.name + "!");
    this.bokemonService.createBokemon(new Bokemon(0, this.wildBokemon.template, this.wildBokemon.lvl))
      .subscribe( bokemon => {
        // let player = this.player;
        console.log(this.player.bokemons);
        this.player.bokemons.push(bokemon);
        console.log(this.player.bokemons);
        this.playerService.updatePlayer(this.player).subscribe(()=>{
          this.savingBokemon();
          console.log("meer bokemon?")})
      })
  }

  run() {
    this.savingBokemon();
    this.goBackToWorld();
  }

  private getRandomLevel(level: number): number {
    let rand = Math.round(Math.random()*(level - (level-5)) + (level-5));
    return Math.max(1, rand);
  }

  private goBackToWorld(){
    this.router.navigate(['world-view'])
  }

  private savingBokemon() {
    this.bokemonService.updateBokemon(this.player.bokemons[0]).subscribe(()=>{
      console.log("saving...")})
      this.goBackToWorld();
  }
}
