import Game from './Game'

const GameList = ({games, pageNum}) => {

    return (
        <div>
            {games.length > 0 ? 
            (games.map((game, index) => ((index >= (pageNum - 1) * 5 && index < pageNum * 5)) ?
                <Game key={game.id} id={game.id} name={game.name}/>: ""))
                : <p style = {{textAlign: 'center'}}>No Games Found...</p>}
        </div>
    )
}

export default GameList