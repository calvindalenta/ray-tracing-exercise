export default class Renderer {
  _width = 800
  _height = 600
  _canvas: HTMLCanvasElement
  _ctx: CanvasRenderingContext2D
  _img: ImageData
  _data32: Uint32Array

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
  }


  clear(color: string | CanvasGradient | CanvasPattern = 'white') {
    this._ctx.fillStyle = color
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)
  }

  _beginFrame() {

  }

  _endFrame() {
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

  render() {
    this.clear()
    this._beginFrame()
    // Quadrant 1
    for(var i = 0; i < (this._canvas.height / 2); i++) {
      for(var j = 0; j < (this._canvas.width / 2); j++) {
        this.putPixel(j, i, 0xFFFF0000);
      }
    }
    // Quadrant 2
    for(var i = 0; i < (this._canvas.height / 2); i++) {
      for(var j = -(this._canvas.width / 2); j < 0; j++) {
        this.putPixel(j, i, 0xFF00FF00);
      }
    }
    // Quadrant 3
    for(var i = -(this._canvas.height / 2); i < 0; i++) {
      for(var j = -(this._canvas.width / 2); j < 0; j++) {
        this.putPixel(j, i, 0xFF0000FF);
      }
    }
    // Quadrant 3
    for(var i = -(this._canvas.height / 2); i < 0; i++) {
      for(var j = 0; j < (this._canvas.width / 2); j++) {
        this.putPixel(j, i, 0xFF000000);
      }
    }
    this._endFrame()
    // requestAnimationFrame(render)
  }
}