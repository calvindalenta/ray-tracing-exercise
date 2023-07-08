const WIDTH = 800
const HEIGHT = 600

const canvas = document.querySelector('canvas')!
canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext('2d')!
ctx.fillStyle = 'white'

var image = ctx.createImageData(canvas.width, canvas.height); 
const data32 = new Uint32Array(image.data.buffer)

function clear() {
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function beginFrame() {

}

function endFrame() {
  clear()
  ctx.putImageData(image, 0, 0);
}

/* 
  Will convert user defined coordinate to screen coordinate
*/
function putPixel(x: number, y: number, color: number) {
  // Alpha, blue, green, red
  data32[x + y * canvas.width] = color
}

function render() {
  beginFrame()
  for(var i = 0; i < canvas.height; ++i) {
    for(var j = 0; j < canvas.width; ++j) {
      putPixel(j, i, 0xFFFF0000);
    }
  }
  endFrame()
  requestAnimationFrame(render)
}

render()

    
