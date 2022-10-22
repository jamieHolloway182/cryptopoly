import Game from './Game'

const PresetList = ({games, pageNum}) => {

    return (
        <div>
            {games.length > 0 ? presets.map((game, index) => (
                (index >= (pageNum - 1) * 5 && index < pageNum * 5) ?
                <Game id={game.id} name={game.name}/>
                : ""
            )): <p style = {{textAlign: 'center'}}>No Games Found...</p>}
        </div>
    )
}

export default PresetList