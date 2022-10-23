import Room from './Room';
import style from '../styles/Layout/Room.module.css'
import { useEffect } from 'react';

const RoomList = ({click, rooms}) => {
    useEffect(() => {
        console.log(rooms)
    })
    return (
        <div  className={style.roomcollection}>
            {rooms.map((room) => <Room title={room.title} price={room.price} color={room.color} click={click}/>)}
        </div>
    )
}

export default RoomList