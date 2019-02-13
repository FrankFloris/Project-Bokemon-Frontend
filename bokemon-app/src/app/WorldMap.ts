export class WorldMap {

  private _id: number;
  private _name: string;
  private _width: number;
  private _height: number;
  private _tiles: string;
  private _emptyTile: number;

  constructor(id: number, name: string, width: number, height: number, tiles: string, emptyTile: number) {
    this._id = id;
    this._name = name;
    this._width = width;
    this._height = height;
    this._tiles = tiles;
    this._emptyTile = emptyTile;
  }

  isInBounds(x: number, y: number): boolean {
    if (x < 0) { return false; }
    if (y < 0) { return false; }
    if (x >= this._width) { return false; }
    if (y >= this._height) { return false; }
    return true;
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

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get tiles(): string {
    return this._tiles;
  }

  set tiles(value: string) {
    this._tiles = value;
  }

  get emptyTile(): number {
    return this._emptyTile;
  }

  set emptyTile(value: number) {
    this._emptyTile = value;
  }

}
