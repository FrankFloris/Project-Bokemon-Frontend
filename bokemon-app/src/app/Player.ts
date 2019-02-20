import {Bokemon} from './bokemon';
import {template} from '@angular/core/src/render3';
import {BokemonTemplate} from './bokemonTemplate';



export class Player {

  id: number = 0;
  username: string;
  password: string;
  world: number;
  sprite: string;
  x: number;
  y: number;
  bokemons: string;

  constructor(id: number, username: string, password: string, world: number, sprite: string, x: number, y: number, bokemons: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.world = world;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.bokemons = bokemons;
  }

  //
  // public static createDefaultInstance(id: number, username: string, password: string) {
  //
  //
  //   return(new Player(id, username, password, 8, "https://i.imgur.com/iwnZWVy.png", 3,0, (getStarterBokemon())))
  // }
  //
  // getStarterBokemon() {
  //   return new Bokemon();
  // }
}
