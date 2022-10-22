import React from 'react';
import Canvas from '../components/Game/Canvas';
import { useState } from "React";
import { nanoid } from "nanoid"

export default function game(){
  
  const [game, setGame] = useState([{
    id: nanoid,
    title: "Connect 4"
  }, {
    id: nanoid,
    title: "Ludo"
  },{
    id: nanoid,
    title: "Monopoly"
  },{
    id: nanoid,
    title: "Scrabble"
  },{
    id: nanoid,
    title: "Snakes and Ladders"
  },
])


  return (
    <div>
      <Game />
    </div>
  )
}
