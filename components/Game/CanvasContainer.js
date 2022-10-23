import React from 'react'
import Canvas from './Canvas'
import styles from '../../styles/Layout/Room.module.css'

const CanvasContainer = ({finish}) => {

  return (
    <div className={styles.roomcollection}>
        <Canvas finish={finish}></Canvas>
    </div>
  )
}

export default CanvasContainer