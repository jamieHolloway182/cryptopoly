import React from 'react'
import style from '../../styles/Home.module.css'


const GameFinishScreen = ( {winner, amount, onCollect, onMoney}) => {


  return (
    <div className={style.container}>
        {winner==1 && <div className={style.finalMessage}>{"You Won!"}</div>}
        {winner==0 && <div className={style.finalMessage}>{"You Lost!"}</div>}
        {winner==1 &&
            <div>
                {" *Click to generate a unique and random collectible!    "}<button className={style.button} onClick={onCollect} >Get Collectable</button>
            </div>}
        {winner==1 &&
            <div>
                {" *Click to earn " + amount + " MATIC!   "}<button className={style.button} onClick={onMoney} >Get Money</button>
            </div>}
    </div>
  )
}

export default GameFinishScreen