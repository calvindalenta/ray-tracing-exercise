import IRenderObject from "./RenderObject";
import Renderer from "./Renderer";
import Vector3 from "./Vector3";

export default class Sphere  {
  radius: number
  center: Vector3
  color: number

  constructor(radius: number, center: Vector3, color: number) {
    this.radius = radius;
    this.center = center;
    this.color = color;
    document.addEventListener('keypress', (ev) => {
      if (ev.key === 'd') {
        this.center = this.center.add(new Vector3(10, 0, 0))
      } else if (ev.key === 'a') {
        this.center = this.center.sub(new Vector3(10, 0, 0))
      } else if (ev.key === 'l') {
        this.center = this.center.sub(new Vector3(0, 10, 0))
      } else if (ev.key === 'o') {
        this.center = this.center.add(new Vector3(0, 10, 0))
      }
    })
  }

  render(timestamp: number) {
    // We are shooting ray from the camera to a pixel on the viewport
    // If this ray intersects with anything, get the object color
    // else, return the background colorfaw
  }
}