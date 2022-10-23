import React from 'react'
import Canvas from './Canvas'
import { useEffect, useRef } from 'react'

const CanvasContainer = ({finish}) => {

  return (
    <div>
        <Canvas finish={finish}></Canvas>
    </div>
  )
}

export default CanvasContainer