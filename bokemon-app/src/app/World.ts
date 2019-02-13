export class World {

  private _id: number;
  private _name: string;
  private _worldMap: number;
  private _players: string;

  constructor(id: number, name: string, worldMap: number, players: string) {
    this._id = id;
    this._name = name;
    this._worldMap = worldMap;
    this._players = players;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get worldMap(): number {
    return this._worldMap;
  }

  set worldMap(value: number) {
    this._worldMap = value;
  }

  get players(): string {
    return this._players;
  }

  set players(value: string) {
    this._players = value;
  }
}
