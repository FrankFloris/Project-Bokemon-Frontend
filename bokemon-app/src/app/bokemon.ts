import {BokemonTemplate} from './bokemonTemplate';

export class Bokemon {



  id: number = 0;
  template: BokemonTemplate;
  lvl: number;

  name: string;
  hp: number;
  atk: number;
  def: number;
  spd: number;

  exp: number;

  constructor(id: number, template: BokemonTemplate, lvl: number){
    this.id = id;
    this.template = template;
    this.lvl = lvl;

    this.name = template.name;
    this.hp = template.baseHp + template.deltaHp*this.lvl;
    this.atk = template.baseAtk + template.deltaAtk*this.lvl;
    this.def = template.baseDef + template.deltaDef*this.lvl;
    this.spd = template.baseSpd + template.deltaSpd*this.lvl;
  }





  // constructor(id: number, name: string, hp: number, atk: number, def: number, spd: number, lvl: number, exp: number, template: BokemonTemplate){
  //   this.bp = template;
  //   this.lvl = lvl;
  //   this.id = id;
  //   this.name = this.bp.name;
  //   this.hp = this.bp.baseHp + this.bp.deltaHp*this.lvl;
  //   this.atk = this.bp.baseAtk + this.bp.deltaAtk*this.lvl;
  //   this.def = this.bp.baseDef + this.bp.deltaDef*this.lvl;
  //   this.spd = this.bp.baseSpd + this.bp.deltaSpd*this.lvl;
  //   this.exp = exp;
  //
  // }







}
