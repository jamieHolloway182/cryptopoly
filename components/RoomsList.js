import Room from './Room';
import style from '../styles/Layout/Room.module.css'

const RoomList = ({click, rooms}) => {
    return (
        <div  className={style.roomcollection}>
            {rooms.map((room) => <Room title={room.title} price={room.price} color={room.color} click={click}/>)}
        </div>
    )
}

export default RoomList