import React, { useEffect, useRef } from 'react'
import styles from '../../styles/canvas/Canvas.module.css'

const Canvas = () => {

    const canvasRef = useRef();

    //game run function, runs every frame and updates canvas
    useEffect(() => {

        //gets canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }, [])

    return (
        <div>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
        </div>
    )
}

export default Canvas