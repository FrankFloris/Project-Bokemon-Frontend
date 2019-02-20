import { Component, OnInit } from '@angular/core';
import {Bokemon} from '../bokemon';
import {BokemonTemplateService} from '../bokemon-template.service';
import {BokemonService} from '../bokemon.service';

@Component({
  selector: 'app-battle-view',
  templateUrl: './battle-view.component.html',
  styleUrls: ['./battle-view.component.css']
})
export class BattleViewComponent implements OnInit {

  constructor(private bokemonService: BokemonService, private templateService: BokemonTemplateService) { }


  wildBokemon: Bokemon;
  playerBokemon: Bokemon;

  ngOnInit() {
    this.createWildBokemon();
    this.getPlayerBokemon();
  }


  createWildBokemon(): void {
    this.templateService.findAll().subscribe(bokemonTemplates => {
      let temp = bokemonTemplates[(Math.floor(Math.random()*bokemonTemplates.length))]; // frank
      this.wildBokemon = new Bokemon(0, temp, (Math.floor(Math.random()*5)+1));   // lvl ook random maken
    });
  }
  private getPlayerBokemon() {
    this.templateService.findAll().subscribe(bokemonTemplates => {
      let temp = bokemonTemplates[(Math.floor(Math.random()*bokemonTemplates.length))]; // frank
      this.playerBokemon = new Bokemon(0, temp, (Math.floor(Math.random()*5)+1));   // lvl ook random maken
    });
  }

  // displayImage(): void{
  //   randomImage = this.wildBokemon.template.sprite
  // }

  attackBokemon() {
    if (this.playerBokemon.spd >= this.wildBokemon.spd) {
      let damageToWildBokemon = Math.round(this.playerBokemon.atk * (100 / (100 + this.wildBokemon.def)));
      this.wildBokemon.hp -= damageToWildBokemon;
      if (this.wildBokemon.hp <= 0){
        window.alert("YOU ARE VICTORIOUS!!!")
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
        }
      }
    }
  }

  useItem() {
    console.log("You cannot use items yet")
  }

  catchBokemon() {
    console.log("You cannot catch Bokemon yet")
  }

  run() {
    console.log("You cannot run from battle")
  }


}
