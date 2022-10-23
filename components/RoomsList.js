import Room from './Room';
import style from '../styles/Layout/Room.module.css'

const GameList = ({click, rooms}) => {
    return (
        <div className={style.roomcollection}>
                <Room  title={rooms.title} price={rooms.price} color={rooms.color} click={click}/>
        </div>
    )
}

export default GameList