export class WorldMap {

  private _urls: string[][];
  private _empty: string;
  private _width: number;
  private _height: number;

  constructor(urls: string[][], empty: string) {
    this._urls = urls;
    this._empty = empty;
    this._width = urls[0].length;
    this._height = urls.length;
  }

  get urls(): string[][] {
    return this._urls;
  }

  get empty(): string {
    return this._empty;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }
}
