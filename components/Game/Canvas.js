import React, { useEffect, useRef } from 'react'
import styles from '../../styles/canvas/Canvas.module.css'

const Canvas = () => {

    //reference for getting canvas
    const canvasRef = useRef();

    //runs only once, on page loading
    useEffect(() => {
        canvasRef.current.width = window.innerWidth - 20;
        canvasRef.current.height = window.innerHeight - 100;
        
        //gets canvas
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        //draw background
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }, [])

    //game run function, runs every frame and updates canvas
    useEffect(() => {

    })

    return (
        <div>
            <canvas ref={canvasRef} className={styles.canvas}></canvas>
        </div>
    )
}

export default Canvas