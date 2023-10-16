import { Shape } from "./Shape";

export class Pentagon extends Shape {
  constructor(app, randomColor, x, y, sideLength, shapeManager) {
    super(app, randomColor, x, y, shapeManager);
    this.sideLength = sideLength || 40;

    this.graphics.moveTo(0, -this.sideLength);
    for (let i = 1; i < 7; i++) {
      const angle = (i / 5) * (2 * Math.PI);
      const xPoint = this.sideLength * Math.cos(angle);
      const yPoint = this.sideLength * Math.sin(angle);
      this.graphics.lineTo(xPoint, yPoint);
    }
  }

  getShapeObject() {
    return {
      shape: this.graphics,
      area: this.#pentagonArea(),
    };
  }

  #pentagonArea() {
    return (
      (5 / 4) * this.sideLength * this.sideLength * (1 / Math.tan(Math.PI / 5))
    );
  }
}
