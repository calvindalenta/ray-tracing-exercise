import Renderer from "./Renderer";
import Vector2 from "./Vector2";

export default class Circle {
  private _renderer: Renderer
  private _radius: number
  private _center: Vector2

  constructor(r: Renderer) {
    this._renderer = r
    this._radius = r._height / 4
    this._center = new Vector2(0, 0)
    document.addEventListener('keypress', (ev) => {
      if (ev.key === 'd') {
        if (this._center.x + this._radius < this._renderer._width / 2) {
          this._center = this._center.add(new Vector2(10, 0))
        }
      } else if (ev.key === 'a') {
        if (this._center.x - this._radius > -(this._renderer._width / 2)) {
          this._center = this._center.sub(new Vector2(10, 0))
        }
      } else if (ev.key === 'l') {
        if (this._center.y - this._radius > -(this._renderer._height / 2)) {
          this._center = this._center.sub(new Vector2(0, 10))
        }
      } else if (ev.key === 'o') {
        if (this._center.y + this._radius < this._renderer._height / 2) {
          this._center = this._center.add(new Vector2(0, 10))
        }
      }
    })
  }

  render(timestamp: number) {
    const rSquared = this._radius * this._radius
    for(var i = -(this._renderer._height / 2); i < (this._renderer._height / 2); i++) {
      for(var j = -(this._renderer._width); j < (this._renderer._width / 2); j++) {
        // If the distance between center and current point <= radius, it's a point in the circle
        const P = new Vector2(j, i);
        const PC = P.sub(this._center) // Difference between point P and C
        const PCLength = PC.dot(PC) // Get vector length
        if (PCLength <= rSquared) {
          this._renderer.putPixel(j, i, 0xFFFF0000);
        }
      }
    }
  }
}