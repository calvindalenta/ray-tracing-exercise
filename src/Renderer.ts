import Sphere from "./Sphere"
import Vector3 from "./Vector3"

export default class Renderer {
  _width = 800
  _height = 800
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _img: ImageData
  private _data32: Uint32Array
  private _spheres: Array<Sphere>

  constructor() {
    this._canvas = document.querySelector('canvas')!
    if (!this._canvas) {
      throw 'Canvas not found'
    }
    this._ctx = this._canvas.getContext('2d')!
    if (!this._ctx) {
      throw 'Canvas context not found'
    }
    this._canvas.width = this._width
    this._canvas.height = this._height
    this._img = this._ctx.createImageData(this._width, this._height); 
    this._data32 = new Uint32Array(this._img.data.buffer)
    this._spheres = []
  }

  public addObject(obj: Sphere) {
    this._spheres.push(obj)
  }

  /* 
    Will convert user defined coordinate to screen coordinate
    Most Left: -(canvas.width / 2)
    Most Right: canvas.width / 2
    Most Top: canvas.height / 2
    Most Down: -(canvas.height / 2)
  */
  putPixel(x: number, y: number, color: number) {
    const screenX = (this._canvas.width / 2) + x
    const screenY = (this._canvas.height / 2) - y // minus y because in screen space y is bigger going down, but the coordinate system y is bigger going up
    // Alpha, blue, green, red
    this._data32[screenX + screenY * this._canvas.width] = color
  }

  private clear() {
    for(var i = -(this._height / 2); i < (this._height / 2); i++) {
      for(var j = -(this._width); j < (this._width / 2); j++) {
        this.putPixel(j, i, 0xFFFFFFFF);
      }
    }
  }

  private _beginFrame() {

  }

  private _endFrame() {
    this._ctx.putImageData(this._img, 0, 0);
  }

  public render() {
    requestAnimationFrame(this._render.bind(this))
  }

  /**
   * Viewport height and width = 1
   * viewport z = 1
   */
  private canvasToViewport(x: number, y: number): Vector3 {
    const viewportWidth = 1
    const viewportHeight = 1
    const viewportZ = 1

    return new Vector3(x * viewportWidth / this._width, y * viewportHeight / this._height, viewportZ)
  }

 private _render(timestamp: number) {
    this.clear()
    this._beginFrame()

    const O = new Vector3(0, 0, 0)

    for(var y = -(this._height / 2); y < (this._height / 2); y++) {
      for(var x = -(this._width); x < (this._width / 2); x++) {
        let closestT: number = Number.MAX_SAFE_INTEGER 
        let closestSphere: null | Sphere = null

        this._spheres.forEach(sphere => {
          const rSquared = sphere.radius * sphere.radius
          const D = this.canvasToViewport(x, y) 
          const CO = O.sub(sphere.center)

          const a = D.dot(D)
          const b = 2 * D.dot(CO)
          const c = CO.dot(CO) - rSquared

          const det = (b * b) - (4 * a * c)
          if (det > 0) {
            const t1 = (-b + Math.sqrt(det)) / (2 * a)
            const t2 = (-b - Math.sqrt(det)) / (2 * a)

            if (1 < t1 && t1 < Number.MAX_SAFE_INTEGER && t1 < closestT) {
              closestT = t1
              closestSphere = sphere
            }
            if (1 < t2 && t2 < Number.MAX_SAFE_INTEGER && t2 < closestT) {
              closestT = t2
              closestSphere = sphere
            }
          }
        })

        if (closestSphere) {
          this.putPixel(x, y, (closestSphere as Sphere).color)
        }
      }
    }

    this._endFrame()
    requestAnimationFrame(this.render.bind(this))
  }
}