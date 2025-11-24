
import Shape from "./shape.js";

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }

  calcArea() {
    return 0.5 * this.base * this.height; 
  }
}

export default Triangle;
