
import Rectangle from "./rectangle.js";
import Circle from "./circle.js";
import Triangle from "./triangle.js";

const shapes = [
  new Rectangle(10, 5),
  new Circle(7),
  new Triangle(8, 4),
];

shapes.forEach((shape) => {
  console.log("Area =", shape.calcArea());
});
