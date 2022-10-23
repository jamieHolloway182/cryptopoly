import roomStyles from '../../styles/Layout/Room.module.css'
import Image from "next/image"

const Game = ({id, name, click, image}) => {
    return(
        <div onClick={click} className={roomStyles.room}>         
            <span>{name}</span>     
            <Image src={image}
                width={"100%"}
                height={"150%"}/>
        </div>
    );
};

export default Game;