import React from 'react';
import Canvas from '../components/Game/Canvas';
import { useState, useRef } from "react";
import { nanoid } from "nanoid"
import PageNav from '../components/Game/PageNav';
import GameList from '../components/Game/GameList';
import Room from '../components/Room';
import Web3 from 'web3'
import BN from 'bn.js'

export default function game(){

  const [numPerPage, updateNumPerPage] = useState(5);
  const [pageNumberSelected, updatePageNumber] = useState(1);
  const [gameListOpen, toggleGameList] = useState(true);
  const [bettingListOpen, toggleBettingList] = useState(false);
  const [gameOpen, toggleGame] = useState(false);

  const [rooms, setRoom] = useState([
  {
    id: nanoid(),
    title: "Lowest",
    price: "0.002",
    color: "#b9a0ee"
  },
  {
    id: nanoid(),
    title: "middle low",
    color: "#abe591",
    price: "0.003"
  },
  {
    id: nanoid(),
    title: "middle high",
    color: "#ed2226",
    price: "0.004"
  },
  {
    id: nanoid(),
    title: "highest",
    color: "#8d8cdf",
    price: "0.005" 
  }
  ]);
  
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
  },{
    id: nanoid(),
    name: "Chess"
  }])

  const [constGames, neverUse] = useState(games);
  const resultRef = useRef();

  const switchPage = (newNum) => {
    const pageNumberSelected = newNum;
    updatePageNumber(pageNumberSelected);
  };

  const handleInput = (event) => {
    filterList(constGames.forEach((game, index) => games[index] = game));
    filterList(games.filter((game) => game.name.includes(event.target.value)));
  }

  const startGame = async (betAmount) => {
    //get web3
    await window.ethereum.sendAsync({data:'eth_requestAccounts'})
    window.web3 = new Web3(window.ethereum);
    //get account
    const accounts = await web3.eth.getAccounts();
    const playerAccount = accounts[0];

    let wei = new BN("100000000000000000")
    let amount = wei * betAmount

    let bool1 = false
    let bool2 = false

    let houseAccount = "0xC1c7f885AfA416e1351830E86A96AB36C83edf5D"
    //player send money to house
    let playerTransaction = await web3.eth.sendTransaction({
      from: playerAccount,
      to: houseAccount,
      value: amount
    }).then(bool1 = true)
    let botAccount = "0xbEA90658D8024deeCD2DA095f314168b083FC44f"
    //bot send money to house
    let houseTransaction = await web3.eth.sendTransaction({
      from: botAccount,
      to: houseAccount,
      value: amount
    }).then(bool2 = true);
    console.log(!(bool1 && bool2))
    while (!(bool1 && bool2)){
      console.log("hey bb ")
      playGame([playerAccount, botAccount])
    }
  }

  const playGame = (accounts, amount) => {
    console.log("jamie")
    endGame(accounts, Math.random() > 0.5 ? 1 : 0, amount)
  }

  const endGame = async(accounts, winner, amount) => {
    let houseAccount = "0xC1c7f885AfA416e1351830E86A96AB36C83edf5D"
    resultRef.current.innerHTML = (winner == 0 ? "You Won " : "You Lost") + amount + "MATIC"
    let returnTransaction = await web3.eth.sendTransaction({
      from: houseAccount,
      to: accounts[winner],
      value: amount
    })
  }

  const clickGameList = () => {
    toggleGameList(false); 
    toggleBettingList(true);
  }

  const clickBettingList = (amount) => {
    toggleBettingList(false);
    toggleGame(true);
    startGame(amount);
  }

  return (
    <div>
      {gameListOpen &&<PageNav length={Math.ceil(games.length / numPerPage)} onChange={switchPage} selected ={pageNumberSelected}/>}
      {gameListOpen && <form onInput={handleInput}>
          <input type="textarea" id="searchBox" style = {{margin:'5px'}} placeholder = "Search for preset..."/>
      </form>}
      {gameListOpen && <GameList click={clickGameList} games={games} pageNum={pageNumberSelected} />}
      {bettingListOpen && rooms.map((room) => (
          <Room key={room.id} 
              title={room.title} 
              price={room.price}
              color={room.color}
              click ={clickBettingList}/>))}
      {gameOpen && <div ref={resultRef}></div>}
    </div>
  )
}
