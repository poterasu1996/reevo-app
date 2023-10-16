import { Shape } from "./Shape";

export class Star extends Shape {
    constructor(app, randomColor, x, y, outerRadius, innerRadius, points, shapeManager) {
      super(app, randomColor, x, y, shapeManager);

      this.outerRadius = outerRadius || 40;
      this.innerRadius = innerRadius || 20;
      this.points = points || 5;
  
      const angle = 0;
      if (points > 2) {
        let step, halfStep, start, n, dx, dy;
        step = (Math.PI * 2) / points;
        halfStep = step / 2;
        start = (angle / 180) * Math.PI;
        this.graphics.moveTo(x + (Math.cos(start) * outerRadius), y - (Math.sin(start) * outerRadius));
        for (n = 1; n <= points; ++n) {
          dx = x + Math.cos(start + (step * n) - halfStep) * innerRadius;
          dy = y - Math.sin(start + (step * n) - halfStep) * innerRadius;
          this.graphics.lineTo(dx, dy);
          dx = x + Math.cos(start + (step * n)) * outerRadius;
          dy = y - Math.sin(start + (step * n)) * outerRadius;
          this.graphics.lineTo(dx, dy);
        }
      }
    }
  
    getShapeObject() {
      return {
        shape: this.graphics,
        area: this.#starArea(),
      };
    }
  
    #starArea() {
      return (5 / 4) * this.outerRadius * this.outerRadius * (1 / Math.tan(Math.PI / (this.points * 2)));
    }
  }