import {BokemonTemplate} from './bokemonTemplate';

export class Bokemon {



  id: number = 0;
  template: BokemonTemplate;
  lvl: number;

  name: string;
  maxHp: number;
  hp: number;
  atk: number;
  def: number;
  spd: number;

  exp: number;

  constructor(id: number, template: BokemonTemplate, lvl: number){
    this.id = id;
    this.template = template;
    this.lvl = lvl;

    this.name = this.template.name;

    this.setStatsByLevel();
  }

  public setStatsByLevel() : void {

    this.maxHp = this.template.baseHp + this.template.deltaHp*this.lvl;
    this.hp = this.template.baseHp + this.template.deltaHp*this.lvl;
    this.atk = this.template.baseAtk + this.template.deltaAtk*this.lvl;
    this.def = this.template.baseDef + this.template.deltaDef*this.lvl;
    this.spd = this.template.baseSpd + this.template.deltaSpd*this.lvl;
  }

}
