import { Shape } from "./Shape";

export class Rectangle extends Shape {
    constructor(app, randomColor, x, y, width, height, shapeManager) {
      super(app, randomColor, x, y, shapeManager);

      this.width = width || 40;
      this.height = height || 40;
      this.graphics.drawRect(0, 0, this.width, this.height);
    }

    getShapeObject() {
      return {
        shape: this.graphics,
        area: this.#rectangleArea(),
      };
    }
  
    #rectangleArea() {
      return this.width * this.height;
    }
  }