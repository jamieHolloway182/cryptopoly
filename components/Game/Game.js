import roomStyles from '../../styles/Layout/Room.module.css'

const Game = ({id, name, click}) => {
    return(
        <div onClick={click} className={roomStyles.room}>         
            <span>{name}</span>           
        </div>
    );
};

export default Game;