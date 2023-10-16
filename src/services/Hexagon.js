import { Shape } from "./Shape";

export class Hexagon extends Shape {
  constructor(app, randomColor, x, y, sideLength, shapeManager) {
    super(app, randomColor, x, y, shapeManager);
    this.sideLength = sideLength || 40;
    
    this.graphics.moveTo(0, -this.sideLength);
    for (let i = 1; i < 8; i++) {
      const angle = (i / 6) * (2 * Math.PI);
      const xPoint = this.sideLength * Math.cos(angle);
      const yPoint = this.sideLength * Math.sin(angle);
      this.graphics.lineTo(xPoint, yPoint);
    }
  }

  getShapeObject() {
    return {
      shape: this.graphics,
      area: this.#hexagonArea(),
    };
  }

  #hexagonArea() {
    return ((3 * Math.sqrt(3)) / 2) * this.sideLength * this.sideLength;
  }
}
