import React, { useEffect, useState } from "react";
import * as PIXI from "pixi.js";

const FallingShapes = () => {
  const [circleCount, setCircleCount] = useState(0);
  const [gravity, setGravity] = useState(2); // Initial gravity value
  const [totalArea, setTotalArea] = useState(0);

  const incrementGravity = () => {
    setGravity((prevGravity) => prevGravity + 1);
  };

  const decrementGravity = () => {
    if (gravity > 1) {
      setGravity((prevGravity) => prevGravity - 1);
    }
  };

  // Calculate the area of a circle based on its radius
  function calculateCircleArea(radius) {
    return Math.PI * radius * radius;
  }

  useEffect(() => {
    let pixiContainer = document.getElementById("pixi-container");
    let pixiCanvas = document.createElement("canvas");
    pixiCanvas.id = "pixi-canvas";
    pixiContainer.appendChild(pixiCanvas);

    // Initialize PixiJS application
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: 600,
      backgroundColor: "#1099bb",
      view: pixiCanvas,
    });

    // Array to store references to the falling circles
    const fallingCircles = [];

    // Create a function to generate a new red circle
    function createFallingCircle(x) {
      const circle = new PIXI.Graphics();
      circle.beginFill(0xff0000); // Red color
      const radius = 20;
      circle.drawCircle(0, 0, radius); // 20px radius
      circle.x = x || Math.random() * app.screen.width;
      circle.y = -20; // Start above the canvas
      app.stage.addChild(circle);

      // Calculate and add the area to the total area
      const area = calculateCircleArea(radius);
      const fallingCircleObject = {
        circle: circle,
        area: area,
      };

      fallingCircles.push(fallingCircleObject);
      setTotalArea((prevArea) => prevArea + area);

      // Add a click event listener to make the circle disappear when clicked
      circle.interactive = true;
      circle.buttonMode = true;
      circle.on("pointerdown", () => {
        app.stage.removeChild(circle);

        // Find the corresponding object in the array
        const removedCircleObject = fallingCircles.find(
          (item) => item.circle === circle
        );

        if (removedCircleObject) {
          fallingCircles.splice(fallingCircles.indexOf(removedCircleObject), 1);
          setCircleCount((count) => count - 1);

          // Remove the area of the removed circle from the total area
          setTotalArea((prevArea) => prevArea - removedCircleObject.area);
        }
      });
      setCircleCount((count) => count + 1);
    }

    // Set up an interval to create a new circle every 1000ms (1 second)
    const interval = setInterval(createFallingCircle, 1000);

    // Animation ticker
    app.ticker.add(() => {
      for (let i = 0; i < fallingCircles.length; i++) {
        const circleObject = fallingCircles[i];
        const circle = circleObject.circle;
        circle.y += gravity; // Adjust the falling speed
        // If the circle goes below the canvas, remove it
        if (circle.y > app.screen.height) {
          app.stage.removeChild(circle);

          // Remove the corresponding object from the array and update the total area
          const removedCircleObject = fallingCircles.splice(i, 1)[0];
          setCircleCount((count) => count - 1);
          setTotalArea((prevArea) => prevArea - removedCircleObject.area);
        }
      }
    });

    // Add a click event listener to pixiContainer to generate a shape at the cursor x position
    function handleCanvasClick(event) {
      // Ensure that the event object is defined
      if (event && event.data) {
        // Check if the click is outside of any existing circles
        if (
          !fallingCircles.some((circle) =>
            circle.containsPoint(event.data.global)
          )
        ) {
          createFallingCircle(
            event.data.global.x - pixiCanvas.getBoundingClientRect().left
          );
        }
      }
    }

    pixiCanvas.addEventListener("click", handleCanvasClick);

    // Clean up the interval and PixiJS application when the component unmounts
    return () => {
      clearInterval(interval);
      setCircleCount(0);
      setTotalArea(0);
      app.destroy({ children: true, texture: true, baseTexture: true });
      pixiContainer.removeEventListener("click", handleCanvasClick);
    };
  }, [gravity]);

  useEffect(() => {
    // there is a bug with PIXI app, it creates multiple canvas elements, that are empty
    // here I remove the first canvases
    let pixiContainer = document.getElementById("pixi-container");
    if (pixiContainer) {
      const canvasElements = pixiContainer.getElementsByTagName("canvas");
      if (canvasElements.length > 1) {
        for (let i = 0; i < canvasElements.length - 1; i++) {
          pixiContainer.removeChild(canvasElements[i]);
        }
      }
    }
  }, [circleCount]);

  return (
    <>
      <div className="canvas-info">
        <div className="total-shapes">Total shapes: {circleCount}</div>
        <div className="total-shapes">
          Surface Area: {totalArea.toFixed(2)} px square
        </div>
      </div>
      <div id="pixi-container"></div>
      <div>
        <button onClick={decrementGravity}>-</button>
        <span>Gravity: {gravity}</span>
        <button onClick={incrementGravity}>+</button>
      </div>
    </>
  );
};

export default FallingShapes;
