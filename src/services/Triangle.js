import { Shape } from "./Shape";

export class Triangle extends Shape {
    constructor(app, randomColor, x, y, sideLength, shapeManager) {
      super(app, randomColor, x, y, shapeManager);
      this.sideLength = sideLength || 40;

      this.graphics.moveTo(0, -this.sideLength / 2);  // posibil problema
      this.graphics.lineTo(this.sideLength, 0);
      this.graphics.lineTo(0, this.sideLength / 2);
      this.graphics.lineTo(0, -this.sideLength / 2);
    }
  
    getShapeObject() {
      return {
        shape: this.graphics,
        area: this.#triangleArea(),
      };
    }
  
    #triangleArea() {
      return (Math.sqrt(3) / 4) * this.sideLength * this.sideLength;
    }
  }