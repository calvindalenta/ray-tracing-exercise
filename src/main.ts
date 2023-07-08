import Circle from "./Circle";
import Renderer from "./Renderer";
import Sphere from "./Sphere";
import Vector3 from "./Vector3";

const renderer = new Renderer()
// const circle = new Circle(renderer)
// renderer.addObject(circle)
const sphere1 = new Sphere(100, new Vector3(0, 0, 2000), 0xFFFF0000)
renderer.addObject(sphere1)
const sphere2 = new Sphere(renderer._height / 4, new Vector3(400, 0, 1000), 0xFF0000FF)
renderer.addObject(sphere2)
renderer.render()