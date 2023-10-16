import * as PIXI from "pixi.js";

export class Shape {
  constructor(app, randomColor, x, y, shapeManager) {
    this.graphics = new PIXI.Graphics();
    this.graphics.lineStyle(1, 0xFFFFFF, 1);
    this.graphics.beginFill(randomColor);
    this.graphics.x = x || Math.random() * app.screen.width;
    this.graphics.y = y || -20; // Start above the canvas
    this.app = app;
    this.shapeManager = shapeManager;
    app.stage.addChild(this.graphics);

    this.graphics.interactive = true;
    this.graphics.buttonMode = true;
    this.graphics.on("pointerdown", () => {
      this.app.stage.removeChild(this.graphics);
      this.shapeManager.removeObject(this.graphics);
    });
  }
}

