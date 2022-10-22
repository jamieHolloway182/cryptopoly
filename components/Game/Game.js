import roomStyles from '../../styles/Layout/Room.module.css'

const Game = ({id, name}) => {
    return(
        <div className={roomStyles.room}>         
            <span>{name}</span>           
        </div>
    );
};

export default Game;