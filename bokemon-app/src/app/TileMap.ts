import {Tile} from "./Tile";
import {WorldMap} from "./WorldMap";

export class TileMap {

  // Database entries
  //private tileCollection: {[id: string]: Tile;}
  // tileIdMap: string[][];
  //private worldMap: WorldMap;

  private _worldMap: WorldMap;
  private _empty: Tile;
  private _map: Tile[][];

  constructor(tiles: Tile[], worldMap: WorldMap) {
    this._worldMap = worldMap;
    let tileCollection : {[id: string]: Tile;} = this.getTileCollection(tiles);
    this.setMap(worldMap, tileCollection);
    this.setEmpty(worldMap, tileCollection);
  }

  public isMoveable(x: number, y: number) {
    if (!this.isInBounds(x,y)) { return false; }
    if (!this._map[y][x].open) { return false; }
    return true;
  }

  public hasBokemon(x: number, y: number) {
    if (!this.isInBounds(x,y)) { return false; }
    return this._map[y][x].monsters;
  }

  public getViewSprites(x: number, y: number, xSize: number, ySize: number, playerSprite: string): string[][] {
    let viewTiles: string[][] = [];
    let xPos: number;
    let yPos: number;

    for (let iy = 0; iy < (2 * ySize + 1); iy++) {
      viewTiles[iy] = [];
      yPos = y + iy - ySize;
      for (let ix = 0; ix < (2 * xSize + 1); ix++) {
        xPos = x + ix - xSize;

        if (ix == xSize && iy == ySize) {
          viewTiles[iy][ix] = playerSprite;
        } else {
          if (this.isInBounds(xPos, yPos)) {
            viewTiles[iy][ix] = this._map[yPos][xPos].sprite;
          } else {
            viewTiles[iy][ix] = this._empty.sprite;
          }
        }
      }
    }
    return viewTiles;
  }

  public getView(x: number, y: number, xSize: number, ySize: number): Tile[][] {
    let viewTiles: Tile[][] = [];
    let xPos: number;
    let yPos: number;

    for (let iy = 0; iy < (2 * ySize + 1); iy++) {
      viewTiles[iy] = [];
      yPos = y + iy - ySize;
      for (let ix = 0; ix < (2 * xSize + 1); ix++) {
        xPos = x + ix - xSize;

        if (this.isInBounds(xPos, yPos)) {
          viewTiles[iy][ix] = this._map[yPos][xPos];
        } else {
          viewTiles[iy][ix] = this._empty;
        }
      }
    }

    return viewTiles;
  }

  private getTileCollection(tiles: Tile[]): {[id: string]: Tile;} {
    let tileCollection: {[id: string]: Tile;} = {};
    for (let tile of tiles) {
      tileCollection[tile.id] = tile;
    }
    return tileCollection;
  }

  private setMap(worldMap: WorldMap, tiles: {[id: string]: Tile;}) {
    let worldMapTiles: string[] = worldMap.tiles.split(',');
    this._map = [];
    for (let y = 0; y < worldMap.height; y++) {
      this._map[y] = [];
      for (let x = 0; x < worldMap.width; x++) {
        this._map[y][x] = tiles[worldMapTiles[y * worldMap.height + x]];
      }
    }
  }

  private setEmpty(worldMap: WorldMap, tiles: {[id: string]: Tile;}) {
    this._empty = tiles[worldMap.emptyTile.toString()];
  }

  private isInBounds(x: number, y: number): boolean {
    if (x < 0) { return false; }
    if (y < 0) { return false; }
    if (x >= this._worldMap.width) { return false; }
    if (y >= this._worldMap.height) { return false; }
    return true;
  }

  get empty(): Tile {
    return this._empty;
  }

  get map(): Tile[][] {
    return this._map;
  }
}
