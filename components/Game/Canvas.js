
import React, { useRef, useEffect, useState } from 'react'
import canvasStyles from '../../styles/canvas/Canvas.module.css'

const Canvas = ({finish}) => {
  
  const canvasRef = useRef(null);
  const [mouse, updateMouse] = useState(false);
  const [lastCoords, updateLastCoords] = useState([-1,-1])
  const [clickedAlive, changeClicked] = useState(true);
  
  const [displayDimensions, updateDisplay] = useState([9, 6]);
  const [cellSize, updateSize] = useState(50);

  const [turn, changeTurn] = useState(false)
  
  useEffect(() => {
      draw()
  })
  
  const createBoard = () => {
      let b = new Array(6);
      for (let i = 0; i < 6; i++){
          let c = [];
          for (let j = 0; j < 9; j++){
              c.push(0);
            }
            b[i] = c
        }
        return b;
    }
    
    const [board, updateBoard] = useState(createBoard())
  const draw = () => {
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
    for (let i = 0; i < 6; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] == 0) {
                ctx.fillStyle = ("#000000");
                ctx.fillRect(j * cellSize, i * cellSize, (j + 1) * cellSize, (i+1) * cellSize);
            }else if (board[i][j] == 1) {
                ctx.fillStyle = ("#FF0000");
                ctx.fillRect(j * cellSize, i * cellSize, (j + 1) * cellSize, (i+1) * cellSize);
            }else if (board[i][j] == 2) {
                ctx.fillStyle = ("#0000FF");
                ctx.fillRect(j * cellSize, i * cellSize, (j + 1) * cellSize, (i+1) * cellSize);
            }
        }
    }
    ctx.stroke();
  }

  function chkLine(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

function chkWinner(bd) {
    // Check down
    for (let r = 0; r < 3; r++)
        for (let c = 0; c < 7; c++)
            if (chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
                return bd[r][c];

    // Check right
    for (let r = 0; r < 6; r++)
        for (let c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
                return bd[r][c];

    // Check down-right
    for (let r = 0; r < 3; r++)
        for (let c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
                return bd[r][c];

    // Check down-left
    for (let r = 3; r < 6; r++)
        for (let c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
                return bd[r][c];

    return 0;
}

    const getCursorPosition = (event) => {
        let canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const x = Math.floor((event.clientX - rect.left) / cellSize)
        const y = Math.floor((event.clientY - rect.top) / cellSize)
        if (board[y][x] == 0){
            board[findLowest(x)][x] = turn ? 1 : 2;
            changeTurn(!turn);
            draw()
        }
        if(chkWinner(board)){
            finish(chkWinner(board) - 1);
        }
    }

    const findLowest = (col) => {
        for (let i = 0; i < 6; i++){
            if (!(board[i][col] == 0)){
                return i - 1;
            }
        }
        return 5;
    }

  return (
      <div className = {canvasStyles.canvasContainer}>
          <canvas onMouseDown={getCursorPosition} className = {canvasStyles.canvas} ref={canvasRef} width={displayDimensions[0] * cellSize} height={displayDimensions[1] * cellSize} ></canvas>
          
      </div>
  )
}

export default Canvas