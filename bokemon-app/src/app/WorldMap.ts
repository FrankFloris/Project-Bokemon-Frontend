export class WorldMap {

  private _urls: string[][];

  constructor(urls: string[][]) {
    this._urls = urls;
  }

  get urls(): string[][] {
    return this._urls;
  }
}
