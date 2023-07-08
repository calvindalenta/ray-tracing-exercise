import Circle from "./Circle"

export default class Renderer {
  _width = 800
  _height = 600
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _img: ImageData
  private _data32: Uint32Array
  private _circle: Circle

  constructor() {
    this._circle = new Circle(this)
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

  public render() {
    requestAnimationFrame(this._render.bind(this))
  }

  private _render(timestamp: number) {
    this.clear()
    this._beginFrame()
    this._circle.render(timestamp)
    this._endFrame()
    requestAnimationFrame(this.render.bind(this))
  }
}