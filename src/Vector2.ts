export default class Vector2 {
  private _x: number
  private _y: number
  
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public get x() {
    return this._x
  }

  public get y() {
    return this._y
  }

  add(r: Vector2): Vector2 {
    return new Vector2(this.x + r.x, this.y + r.y)
  }

  sub(r: Vector2): Vector2 {
    return new Vector2(this.x - r.x, this.y - r.y)
  }

  scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  div(scalar: number): Vector2 {
    return this.scale(1/scalar)
  }

  dot(r: Vector2): number {
    return (this.x * r.x) + (this.y * r.y);
  }
}