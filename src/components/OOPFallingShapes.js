import React, { useState, useEffect } from "react";
import { ShapeManager } from "../services/ShapeManager";

const OOPFallingShapes = () => {
  const [gravity, setGravity] = useState(2);
  const [circleCount, setCircleCount] = useState(0);
  const [totalArea, setTotalArea] = useState(0);

  const incrementGravity = () => {
    setGravity((prevGravity) => prevGravity + 1);
  };

  const decrementGravity = () => {
    if (gravity > 2) {
      setGravity((prevGravity) => prevGravity - 1);
    }
  };
 
  useEffect(() => {
    const shapeService = new ShapeManager();
    let pixiContainer = document.getElementById("pixi-container");
    let pixiCanvas = document.createElement("canvas");
    pixiCanvas.id = "pixi-canvas";
    pixiContainer.appendChild(pixiCanvas);

    shapeService.initiate(pixiCanvas, gravity);

    // Set up an interval to create a new shape every 1000ms (1 second)
    const interval = setInterval(() => {
      shapeService.generateRandomShape();
      setCircleCount(shapeService.objectsCount);
      setTotalArea(shapeService.totalArea);
    }, 1000);

    shapeService.pixiTicker();

    // Clean up the interval and PixiJS application when the component unmounts
    return () => {
      clearInterval(interval);
      setCircleCount(0);
      setTotalArea(0);
      shapeService.reinitializeProps();
      shapeService.app.destroy({
        children: true,
        texture: true,
        baseTexture: true,
      });
    };
  }, [gravity]);

  return (
    <>
      <div className="canvas-info">
        <div className="total-shapes">Total shapes: {circleCount}</div>
        <div className="total-shapes">
          Surface Area: {totalArea.toFixed(2) || 0} px square
        </div>
      </div>
      <div id="pixi-container"></div>
      <div className="canvas-controlls">
        <button onClick={decrementGravity}>-</button>
        <span>Gravity: {gravity}</span>
        <button onClick={incrementGravity}>+</button>
      </div>
    </>
  );
};

export default OOPFallingShapes;
