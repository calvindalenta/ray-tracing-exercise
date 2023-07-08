const WIDTH = 800
const HEIGHT = 600

const canvas = document.querySelector('canvas')!
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext('2d')!

var image = ctx.createImageData(canvas.width, canvas.height); 
const data32 = new Uint32Array(image.data.buffer)

function clear(color: string | CanvasGradient | CanvasPattern = 'white') {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function beginFrame() {

}

function endFrame() {
  ctx.putImageData(image, 0, 0);
}

/* 
  Will convert user defined coordinate to screen coordinate
  Most Left: -(canvas.width / 2)
  Most Right: canvas.width / 2
  Most Top: canvas.height / 2
  Most Down: -(canvas.height / 2)
*/
function putPixel(x: number, y: number, color: number) {
  const screenX = (canvas.width / 2) + x
  const screenY = (canvas.height / 2) - y // minus y because in screen space y is bigger going down, but the coordinate system y is bigger going up
  // Alpha, blue, green, red
  data32[screenX + screenY * canvas.width] = color
}

function render() {
  clear()
  beginFrame()
  // Quadrant 1
  for(var i = 0; i < (canvas.height / 2); i++) {
    for(var j = 0; j < (canvas.width / 2); j++) {
      putPixel(j, i, 0xFFFF0000);
    }
  }
  // Quadrant 2
  for(var i = 0; i < (canvas.height / 2); i++) {
    for(var j = -(canvas.width / 2); j < 0; j++) {
      putPixel(j, i, 0xFF00FF00);
    }
  }
  // Quadrant 3
  for(var i = -(canvas.height / 2); i < 0; i++) {
    for(var j = -(canvas.width / 2); j < 0; j++) {
      putPixel(j, i, 0xFF0000FF);
    }
  }
  // Quadrant 3
  for(var i = -(canvas.height / 2); i < 0; i++) {
    for(var j = 0; j < (canvas.width / 2); j++) {
      putPixel(j, i, 0xFF000000);
    }
  }
  endFrame()
  // requestAnimationFrame(render)
}

render()

    
