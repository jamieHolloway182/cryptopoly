import React, { useEffect } from 'react';
import CanvasContainer from '../components/Game/CanvasContainer';
import { useState, useRef } from "react";
import { nanoid } from "nanoid"
import PageNav from '../components/Game/PageNav';
import GameList from '../components/Game/GameList';
import RoomList from '../components/RoomsList';
import Web3 from 'web3'
import BN from 'bn.js'
import styles from '../styles/games/game.module.css'
import GameFinishScreen from '../components/Game/GameFinishScreen';

export default function Game(){

  const [numPerPage, updateNumPerPage] = useState(8);
  const [pageNumberSelected, updatePageNumber] = useState(1);
  const [gameListOpen, toggleGameList] = useState(true);
  const [bettingListOpen, toggleBettingList] = useState(false);
  const [gameOpen, toggleGame] = useState(false);
  const [gameReady, toggleReady] = useState(false);
  const [gameFinished, toggleFinish] = useState(false);
  const [winner, updateWinner] = useState(-1)

  useEffect(() => {
    console.log("tri")
  })

  const [rooms, setRoom] = useState([
  {
    id: nanoid(),
    title: "Bronze Room",
    price: "0.002",
    color: "#b9a0ee"
  },
  {
    id: nanoid(),
    title: "Silver Room",
    color: "#abe591",
    price: "0.003"
  },
  {
    id: nanoid(),
    title: "Gold Room",
    color: "#ed2226",
    price: "0.004"
  },
  {
    id: nanoid(),
    title: "Diamond Room",
    color: "#8d8cdf",
    price: "0.005" 
  }
  ]);
  
  const [games, filterList] = useState([{
    id: nanoid(),
    name: "Connect 4",
    image: "/../public/connect4.jpg"
  }, {
    id: nanoid(),
    name: "Ludo",
    image: "/../public/ludo.jpg"
  },{
    id: nanoid(),
    name: "Monopoly",
    image: "/../public/monopoly.jpg"
  },{
    id: nanoid(),
    name: "Scrabble",
    image: "/../public/scrabble.jpg"
  },{
    id: nanoid(),
    name: "Snakes and Ladders",
    image: "/../public/snakes.jpg"
  },{
    id: nanoid(),
    name: "Chess",
    image: "/../public/chess.jpg"
  },{
    id: nanoid(),
    name: "Uno",
    image: "/../public/uno.png"
  },{
    id: nanoid(),
    name: "Black Jack",
    image: "/../public/blackjack.jpg"
  }])

  const [constGames, neverUse] = useState(games);
  const resultRef = useRef();
  const playerOneRef = useRef();
  const playerTwoRef = useRef();
  const canvasRef = useRef(null);

  const [amount, setAmount] = useState(null);
  const [house, setHouse] = useState("0xC1c7f885AfA416e1351830E86A96AB36C83edf5D");
  const [bot, setBot] = useState("0xbEA90658D8024deeCD2DA095f314168b083FC44f");
  const [player, setPlayer] = useState("0x67A871826d5179C83a6072C7A7b9a4F1BEebF3F5");

  const [gameStarted,updateStart] = useState(false)

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
    let wei = new BN("100000000000000000")
    let amount = wei * betAmount;
    //player send money to house
    let playerTransaction = await web3.eth.sendTransaction({
      from: player,
      to: house,
      value: amount
    }).then(() => {playerOneRef.current.innerHTML = "Player One Connected!"; });
    transactionTwo(amount);
  }
  
  const transactionTwo = async (amount) => {
    let houseTransaction = await web3.eth.sendTransaction({
      from: player,
      to: house,
      value: amount
    }).then(() => {
      playerTwoRef.current.innerHTML = "Player Two Connected!";
      toggleReady(true)
    });
    setAmount(amount)
  }

  const endGame = (winner) => {
    updateWinner(winner);
    toggleGame(false);
    toggleReady(false);
    toggleFinish(true);
  }

  const endGameWithMoney = async() => {
    let accounts = [house, bot];
    let returnTransaction = await web3.eth.sendTransaction({
      from: player,
      to: accounts[winner],
      value: (amount * 2)
    })
  }

  const endGameWithCollectible = () =>{

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

  const weiToMatic = () => {
    let wei = new BN("1000000000000000000")
    return (amount / wei) * 2;
  }

  return (
    <div className={styles.gameContainer}>
      {gameListOpen &&<PageNav length={Math.ceil(games.length / numPerPage)} onChange={switchPage} selected ={pageNumberSelected}/>}
      {gameListOpen && <form  onInput={handleInput}>
          <input type="textarea" id="searchBox" className={styles.searchBar} placeholder = "Search for game..."/>
      </form>}
      {gameListOpen && <GameList click={clickGameList} games={games} pageNum={pageNumberSelected} />}
      {bettingListOpen && <RoomList click = {clickBettingList} rooms={rooms}/>}
      <div className={styles.connectionContainer}>
        {gameOpen && !gameReady && <div ref={playerOneRef}>Player One Connecting...</div>}
        {gameOpen && !gameReady && <div ref={playerTwoRef}>Player Two Connecting...</div>}
      </div>
      {gameReady && <CanvasContainer finish={endGame}></CanvasContainer>}
      {gameFinished && <GameFinishScreen winner={winner} amount={weiToMatic()} onMoney={endGameWithMoney} onCollect={endGameWithCollectible}></GameFinishScreen>}
    </div>
  )
}
