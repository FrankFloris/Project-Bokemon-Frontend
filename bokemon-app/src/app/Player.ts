
export class Player {

  id: number = 0;
  username: string;
  password: string;
  world: number;
  sprite: string;
  x: number;
  y: number;

  constructor(id: number, username: string, password: string, world: number, sprite: string, x: number, y: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.world = world;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }
}
