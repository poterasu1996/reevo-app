import { Shape } from "./Shape";

export class Ellipse extends Shape{
    constructor(app, randomColor, x, y, radiusX, radiusY, shapeManager) {
      super(app, randomColor, x, y, shapeManager);
      this.radiusX = radiusX || 40;
      this.radiusY = radiusY || 20;
      this.graphics.drawEllipse(0, 0, this.radiusX, this.radiusY);
    }
  
    getShapeObject() {
      return {
        shape: this.graphics,
        area: this.#calculateArea(),
      }
    }
  
    #calculateArea() {
      return Math.PI * this.radiusX * this.radiusY;
    }
  }