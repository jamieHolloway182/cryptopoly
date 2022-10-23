import React from 'react'
import style from '../../styles/Layout/FinishScreen.module.css'


const GameFinishScreen = ( {winner, amount, onCollect, onMoney}) => {


  return (
    <div>
        {winner==1 && <div>{"You Won!"}</div>}
        {winner==0 && <div>{"You Lost!"}</div>}
        {winner==1 &&
            <div>
                {"Click to generate a unique and random collectible!    "}<button className={style.button} onClick={onCollect} >Get Collectable</button>
            </div>}
        {winner==1 &&
            <div>
                {"Click to earn " + amount + " MATIC!   "}<button className={style.button} onClick={onMoney} >Get Money</button>
            </div>}
    </div>
  )
}

export default GameFinishScreen