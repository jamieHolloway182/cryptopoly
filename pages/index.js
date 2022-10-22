import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import {nanoid} from "nanoid";
import Room from "../components/Layout/Room"

export default function Home() {

    //holds the different rooms
    const [rooms, setRoom] = useState([
    {
      id: nanoid,
      title: "Lowest",
      price: "0.000001",
      color: "#b9a0ee"
    },
    {
      id: nanoid,
      title: "middle low",
      color: "#abe591",
      price: "0.00001"
    },
    {
      id: nanoid,
      title: "middle high",
      color: "#ed2226",
      price: "0.0001"
    },
    {
      id: nanoid,
      title: "highest",
      color: "#8d8cdf",
      price: "0.001" 
    }
    ]);
  
  return (
    <div>
        {rooms.map((room) => (
          <Room id={room.id} 
              title={room.title} 
              price={room.price}
              color={room.color}/>))}

    </div>
  )
}
