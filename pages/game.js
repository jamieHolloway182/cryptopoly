import React from 'react';
import Canvas from '../components/Game/Canvas';
import { useState } from "react";
import { nanoid } from "nanoid"
import PageNav from '../components/Game/PageNav';
import GameList from '../components/Game/GameList';

export default function game(){

  const [numPerPage, updateNumPerPage] = useState(5);
  const [pageNumberSelected, updatePageNumber] = useState(1);
  
  const [games, filterList] = useState([{
    id: nanoid(),
    name: "Connect 4"
  }, {
    id: nanoid(),
    name: "Ludo"
  },{
    id: nanoid(),
    name: "Monopoly"
  },{
    id: nanoid(),
    name: "Scrabble"
  },{
    id: nanoid(),
    name: "Snakes and Ladders"
  },,{
    id: nanoid(),
    name: "Chess"
  }])

  const [constGames, neverUse] = useState(games);

  const switchPage = (newNum) => {
    const pageNumberSelected = newNum;
    updatePageNumber(pageNumberSelected);
  };

  const handleInput = (event) => {
    filterList(constGames.forEach((game, index) => games[index] = game));
    filterList(games.filter((game) => game.name.includes(event.target.value)));
  }

  return (
    <div>
      <div>
            <PageNav length={Math.ceil(games.length / numPerPage)} onChange={switchPage} selected ={pageNumberSelected}/>
            <form onInput={handleInput}>
                <input type="textarea" id="searchBox" style = {{margin:'5px'}} placeholder = "Search for preset..."/>
            </form>
            <GameList games={games} pageNum={pageNumberSelected} />
        </div>
    </div>
  )
}
