import roomStyles from '../../styles/Layout/Room.module.css'

const Room = ({id, title, price, color}) => {
    return(
        <div className={roomStyles.room}>         
            <span>{title}</span>
            <div>Amount betting: {price}</div>                    
        </div>
    );
};

export default Room;