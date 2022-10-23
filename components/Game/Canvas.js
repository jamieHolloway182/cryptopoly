import { useState } from 'react'
import React, { useRef, useEffect } from 'react'
import canvasStyles from '../../styles/canvas/Canvas.module.css'

const Canvas = () => {
  
  const canvasRef = useRef(null);
  const [mouse, updateMouse] = useState(false);
  const [lastCoords, updateLastCoords] = useState([-1,-1])
  const [clickedAlive, changeClicked] = useState(true);

  const [displayDimensions, updateDisplay] = useState([9, 9]);
  const [cellSize, updateSize] = useState(50);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    for (let i = 0; i < ctx.canvas.height / cellSize ; i ++){
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(ctx.canvas.width, i * cellSize);
    }
    for (let i = 0; i < ctx.canvas.width / cellSize ; i ++){
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i* cellSize, ctx.canvas.height);
    }
    ctx.stroke();
  })


  return (
      <div className = {canvasStyles.canvasContainer}>
          <canvas className = {canvasStyles.canvas} ref={canvasRef} width={displayDimensions[0] * cellSize} height={displayDimensions[1] * cellSize} ></canvas>
          
      </div>
  )
}

export default Canvas