import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import {nanoid} from "nanoid";
import Room from "../components/Layout/Room"

export default function Home() {

  useEffect(() => {

  })
  
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
