import React from 'react'
import style from '../../styles/Layout/FinishScreen.module.css'


const GameFinishScreen = ( {winner, amount, onCollect, onMoney}) => {


  return (
    <div>
        <button className={style.button} onClick={onCollect} >Get Collectable</button>
        <button className={style.button} onClick={onMoney} >Get Money</button>
        
    </div>
  )
}

export default GameFinishScreen