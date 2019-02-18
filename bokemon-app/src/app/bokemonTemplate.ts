
export class BokemonTemplate {

  id: number = 0;
  name: string;
  sprite: string;
  baseHp: number;
  deltaHp: number;
  baseAtk: number;
  deltaAtk: number;
  baseDef: number;
  deltaDef: number;
  baseSpd: number;
  deltaSpd: number;
  bokemonType: number;

  constructor(id: number, name: string, sprite: string, baseHp: number, deltaHp: number,
              baseAtk: number, deltaAtk: number, baseDef: number, deltaDef: number,
              baseSpd: number, deltaSpd: number, bokemonType: number){
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.baseHp = baseHp;
    this.deltaHp = deltaHp;
    this.baseAtk = baseAtk;
    this.deltaAtk = deltaAtk;
    this.baseDef = baseDef;
    this.deltaDef = deltaDef;
    this.baseSpd = baseSpd;
    this.deltaSpd = deltaSpd;
    this.bokemonType = bokemonType;
  }

}



