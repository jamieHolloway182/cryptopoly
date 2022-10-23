import Game from './Game'
import style from '../../styles/Layout/Room.module.css'

const GameList = ({games, pageNum, click}) => {
    return (
        <div className={style.roomcollection}>
            {games.length > 0 ? 
            (games.map((game, index) => ((index >= (pageNum - 1) * 8 && index < pageNum * 8)) ?
                <Game click={click} key={game.id} id={game.id} name={game.name} image={game.image}/>: ""))
                : <p style = {{textAlign: 'center'}}>No Games Found...</p>}
        </div>
    )
}

export default GameList