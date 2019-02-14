export class Tile {
  private _id: number;
  private _name: string;
  private _sprite: string;
  private _open: boolean;
  private _monsters: boolean;

  constructor(id: number, name: string, sprite: string, open: boolean, monsters: boolean) {
    this._id = id;
    this._name = name;
    this._sprite = sprite;
    this._open = open;
    this._monsters = monsters;
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

  get sprite(): string {
    return this._sprite;
  }

  set sprite(value: string) {
    this._sprite = value;
  }

  get open(): boolean {
    return this._open;
  }

  set open(value: boolean) {
    this._open = value;
  }

  get monsters(): boolean {
    return this._monsters;
  }

  set monsters(value: boolean) {
    this._monsters = value;
  }
}
