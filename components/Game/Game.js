import roomStyles from '../../styles/Layout/Room.module.css'

const Game = ({id, title}) => {
    return(
        <div className={roomStyles.room}>         
            <span>{title}</span>           
        </div>
    );
};

export default Room;