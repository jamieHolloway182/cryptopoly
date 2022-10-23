import Game from './Game'
import style from '../../styles/Layout/Room.module.css'

const GameList = ({games, pageNum, click}) => {
    return (
        <div className={style.roomcollection}>
            {games.length > 0 ? 
            (games.map((game, index) => ((index >= (pageNum - 1) * 6 && index < pageNum * 6)) ?
                <Game click={click} key={game.id} id={game.id} name={game.name}/>: ""))
                : <p style = {{textAlign: 'center'}}>No Games Found...</p>}
        </div>
    )
}

export default GameList