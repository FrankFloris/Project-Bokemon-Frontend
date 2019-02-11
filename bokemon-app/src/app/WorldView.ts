import {WorldMap} from './WorldMap';

export class WorldView {

  xDistance: number;
  yDistance: number;
  view: string[][];

  constructor(xDistance: number, yDistance: number) {
    this.xDistance = xDistance;
    this.yDistance = yDistance;
  }

  getViewUrls(x: number, y: number, map: WorldMap): string[][] {
    this.view = [];
    let xPos: number;
    let yPos: number;
    for (let iy = 0; iy < (2 * this.yDistance + 1); iy++) {
      this.view[iy] = [];
      yPos = y + iy - this.yDistance;
      for (let ix = 0; ix < (2 * this.xDistance + 1); ix++) {
        xPos = x + ix - this.xDistance;
        if (this.isInBounds(xPos, yPos, map.width, map.height)) {
          this.view[iy][ix] = map.urls[yPos][xPos];
        } else {
          this.view[iy][ix] = map.empty;
        }
      }
    }
    return this.view;
  }

  isInBounds(x: number, y: number, width: number, height: number): boolean {
    if (x < 0) { return false; }
    if (y < 0) { return false; }
    if (x >= width) { return false; }
    if (y >= height) { return false; }
    return true;
  }






}
