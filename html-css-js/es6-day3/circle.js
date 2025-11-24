
import Shape from "./shape.js";

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calcArea() {
    return Math.PI * this.radius * this.radius; 
  }
}

export default Circle;
