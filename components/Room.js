import roomStyles from '../styles/Layout/Room.module.css'

const Room = ({title, price, color, click}) => {
    return(
        <div onClick={click.bind(this, price)}className={roomStyles.room}>         
            <span>{title}</span>
            <div>Amount betting: {price}</div>                    
        </div>
    );
};

export default Room;