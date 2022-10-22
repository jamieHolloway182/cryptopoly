import React, { useEffect, useState, useRef } from "react"
import CollectionCarousel from "../components/Collection/CollectionCarousel"
import Web3 from 'web3'
import styles from '../styles/collection/collection.module.css'

const collection = () => {

  const carouselRef = useRef();

  const [toggle, updateToggle] = useState(true);

  async function getAccount(){
    //connect with web3
    await window.ethereum.sendAsync({data:'eth_requestAccounts'})
    window.web3 = new Web3(window.ethereum);
    //get account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    //get contract
    let abi = [{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}];
    let address = "0x8bBd55747b339929f9245f1303b9D2c9F5246350";
    let contract = await new web3.eth.Contract(abi, address);

    let inc = await contract.methods.increment();
    let gas = await inc.estimateGas();
    console.log(gas)
    let count = await inc.call();
    console.log("Count:" + count);
    console.log(contract)

    let transaction = await contract.methods.increment().send({
      from: account,
      gas: gas
    });
  }



  useEffect(() => {
    //getAccount();
      carouselRef.current.addEventListener('click', (event) => {
        updateToggle(false)
      })
  }, []);

  return (
    <div>
      {toggle &&
      <div className={styles.carouselContainer}>
        <CollectionCarousel ref={carouselRef}></CollectionCarousel>
      </div>}

      {!toggle
      
      }
    </div>
  )
}

export default collection
