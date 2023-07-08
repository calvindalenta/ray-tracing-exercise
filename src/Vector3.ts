export default class Vector3 {
  private _x: number
  private _y: number
  private _z: number

  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  public get x() { return this._x }
  public get y() { return this._y }
  public get z() { return this._z }

  add(r: Vector3): Vector3 {
    return new Vector3(this.x + r.x, this.y + r.y, this.z + r.z);
  }

  sub(r: Vector3): Vector3 {
    return new Vector3(this.x - r.x, this.y - r.y, this.z - r.z);
  }

  scale(scalar: number): Vector3 {
    return new Vector3((this.x * scalar), (this.y * scalar), (this.z * scalar))
  }

  dot(r: Vector3): number {
    return (this.x * r.x) + (this.y * r.y) + (this.z * r.z)
  }
}