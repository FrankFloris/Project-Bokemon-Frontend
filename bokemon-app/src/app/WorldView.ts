import {WorldMap} from './WorldMap';

export class WorldView {

  xDistance: number;
  yDistance: number;
  view: number[][];

  constructor(xDistance: number, yDistance: number) {
    this.xDistance = xDistance;
    this.yDistance = yDistance;
  }

  getViewNumbers(x: number, y: number, map: WorldMap): number[][] {
    this.view = [];
    let xPos: number;
    let yPos: number;
    for (let iy = 0; iy < (2 * this.yDistance + 1); iy++) {
      this.view[iy] = [];
      yPos = y + iy - this.yDistance;
      for (let ix = 0; ix < (2 * this.xDistance + 1); ix++) {
        xPos = x + ix - this.xDistance;
        if (this.isInBounds(xPos, yPos, map)) {
          this.view[iy][ix] = this.getTileId(xPos, yPos, map);
        } else {
          this.view[iy][ix] = map.emptyTile;
        }
      }
    }
    return this.view;
  }



  getTileId(x: number, y: number, map: WorldMap): number {
    const tilesArray: number[] = map.tiles.split(',').map(Number);
    return tilesArray[y * map.height + x];
  }

  isInBounds(x: number, y: number, map: WorldMap): boolean {
    if (x < 0) { return false; }
    if (y < 0) { return false; }
    if (x >= map.width) { return false; }
    if (y >= map.height) { return false; }
    return true;
  }







}
