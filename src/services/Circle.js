import { Shape } from "./Shape";

export class Circle extends Shape {
  constructor(app, randomColor, x, y, radius, shapeManager) {
    super(app, randomColor, x, y, shapeManager);

    this.radius = radius;
    this.graphics.drawCircle(0, 0, this.radius);
  }

  getShapeObject() {
    return {
      shape: this.graphics,
      area: this.calculateArea(),
    }
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}
