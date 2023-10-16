import * as PIXI from "pixi.js";
import { Circle } from "./Circle";
import { Ellipse } from "./Ellipse";
import { Rectangle } from "./Rectangle";
import { Triangle } from "./Triangle";
import { Pentagon } from "./Pentagon";
import { Hexagon } from "./Hexagon";
import { Star } from "./Star";

class ShapeManager {
  constructor() {
    this.fallingObjects = [];
    this.objectsCount = 0;
    this.totalArea = 0;
    this.y = -40;
    this.fallingShapes = [];
    this.shapeTypes = ["3 sides", "4 sides", "5 sides", "6 sides", "Circle", "Ellipse", "Star"];
  }

  initiate(pixiCanvas, gravity) {
    this.gravity = gravity;
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: 600,
      backgroundColor: "#1099bb",
      view: pixiCanvas,
    });
    this.x = Math.random() * this.app.screen.width;
  }
  // implement methods to create, update and remove shapes

  reinitializeProps() {
    this.fallingObjects = [];
    this.objectsCount = 0;
    this.totalArea = 0;
  }

  #getRandomColor() {
    return Math.random() * 0xffffff;
  }

  generateRandomShape(x) {
    const randomIndex = Math.floor(Math.random() * this.shapeTypes.length);
    const randomShapeType = this.shapeTypes[randomIndex];
    const randomColor = this.#getRandomColor();

    this.draw(randomShapeType, randomColor, x);
  }

  removeObject(objectToRemove) {
    // Find the index of the object to remove in the fallingObjects array
    const removedShapeObject = this.fallingObjects.find(
      (object) => object.shape === objectToRemove
    );

    if (removedShapeObject) {
      this.fallingObjects.splice(this.fallingObjects.indexOf(removedShapeObject), 1);
      this.objectsCount -= 1;
      this.totalArea -= removedShapeObject.area;
      if (this.onObjectRemoved) {
        this.onObjectRemoved(removedShapeObject);
      }
    }
  }

  draw(shapeType, randomColor, x) {
    const xPos = x || Math.random() * this.app.screen.width;
    switch (shapeType) {
      case "Circle":
        this.drawCircle(this.app, randomColor, xPos, this.y, 30);
        break;
      case "Ellipse":
        this.drawEllipse(this.app, randomColor, xPos, this.y, 40, 20);    
        break;  
      case "3 sides":
        this.drawTriangle(this.app, randomColor, xPos, this.y, 40);
        break;
      case "4 sides":
        this.drawRectangle(this.app, randomColor, xPos, this.y, 40, 40);
        break;
      case "5 sides":
        this.drawPentagon(this.app, randomColor, xPos, this.y, 30);
        break;
      case "6 sides":
        this.drawHexagon(this.app, randomColor, xPos, this.y, 30);
        break;
      case "Star":
        this.drawStar(this.app, randomColor, xPos, this.y, 40, 20, 5);
        break;
      default:
        console.log("Invalid shape type");
    }
  }

  drawCircle(app, randomColor, x, y, radius) {
    const circle = new Circle(app, randomColor, x, y, radius, this);
    const circleObject = circle.getShapeObject();
    this.fallingObjects.push(circleObject);
    const area = circleObject.area;
    this.totalArea += area;
    this.objectsCount += 1;
  }

  drawEllipse(app, randomColor, x, y, radiusX, radiusY) {
    const ellipse = new Ellipse(app, randomColor, x, y, radiusX, radiusY, this);
    const ellipseObject = ellipse.getShapeObject();
    this.fallingObjects.push(ellipseObject);
    const area = ellipseObject.area;
    this.totalArea += area;
    this.objectsCount += 1;
  }

  drawTriangle(app, randomColor, x, y, sideLength) {
    const triangle = new Triangle(app, randomColor, x, y, sideLength, this);
    const triangleObject = triangle.getShapeObject();
    this.fallingObjects.push(triangleObject);
    const area = triangleObject.area;
    this.totalArea += area;
    this.objectsCount += 1;
  }

  drawRectangle(app, randomColor, x, y, width, height) {
    const rectangle = new Rectangle(app, randomColor, x, y, width, height, this);
    const rectangleObject = rectangle.getShapeObject();
    this.fallingObjects.push(rectangleObject);
    const area = rectangleObject.area;
    this.totalArea += area;
    this.objectsCount += 1;
  }

  drawPentagon(app, randomColor, x, y, width) {
    const pentagon = new Pentagon(app, randomColor, x, y, width, this);
    const pentagonObj = pentagon.getShapeObject();
    this.fallingObjects.push(pentagonObj);
    const area = pentagonObj.area;
    this.totalArea += area;
    this.objectsCount += 1;
  }

  drawHexagon(app, randomColor, x, y, width) {
    const hexagon = new Hexagon(app, randomColor, x, y, width, this);
    const hexagonObj = hexagon.getShapeObject();
    this.fallingObjects.push(hexagonObj);
    const area = hexagonObj.area;
    this.totalArea += area;
    this.objectsCount += 1;
  }

  drawStar(app, randomColor, x, y, outerRad, innerRad, points) {
    const star = new Star(app, randomColor, x, y, outerRad, innerRad, points, this);
    const starObj = star.getShapeObject();
    this.fallingObjects.push(starObj);
    const area = starObj.area;
    this.totalArea += area;
    this.objectsCount += 1;
  }

  #updateCanvasData(isInCanvas, shapeObject) {
    if(isInCanvas) {
      this.objectsCount += 1;
      this.totalArea += shapeObject.area;
    } else {
      this.objectsCount -= 1;
      this.totalArea -= shapeObject.area;
    }
  }

  pixiTicker() {
    this.app.ticker.add(() => {
      for (let i = 0; i < this.fallingObjects.length; i++) {
        const shapeObject = this.fallingObjects[i];
        const shape = shapeObject.shape;
        shape.y += this.gravity;
        // if (shape.y > 5 && shape.y <= 6) {
        //   const object = this.fallingObjects[i];
        //   this.#updateCanvasData(true, object);
        // }
        if (shape.y > this.app.screen.height) {
          this.app.stage.removeChild(shape);

          // remove coresponding object from the array and update total area
          const removedObject = this.fallingObjects.splice(i, 1)[0];
          this.#updateCanvasData(false, removedObject);
        }
      }
    });
  }
}

export { ShapeManager };
