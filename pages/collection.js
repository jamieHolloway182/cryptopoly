import React, { useEffect, useState, useRef } from "react"
import CollectionCarousel from "../components/Collection/CollectionCarousel"
import Web3 from 'web3'
import styles from '../styles/collection/collection.module.css'
import CollectibleCreator from "../components/Collection/CollectibleCreator"

const Collection = () => {

  const carouselRef = useRef();

  const [toggle, updateToggle] = useState(true);

  async function getAccount(){
    //connect with web3
    await window.ethereum.sendAsync({data:'eth_requestAccounts'})
    window.web3 = new Web3(window.ethereum);
    //get account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    var abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"collectibles","type":"uint256[]"}],"name":"GetCollectibles","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"collectibleId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"dna","type":"uint256"}],"name":"NewCollectible","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"collectibleToOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"collectibles","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dna","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"createRandomCollectible","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getCollectiblesByOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    var contractAddress = "0xA7176f600D9C7FCD378aa37508F90F5d87cb6Dc8"
    let CollectibleFactoryContract = await new web3.eth.Contract(abi, contractAddress);
    
    let create = await CollectibleFactoryContract.methods.getCollectiblesByOwner();
    let gas = await create.estimateGas();
    
    let transaction = create.send({
        from: account,
        gas: gas * 2
    })
  }

  useEffect(() => {
    getAccount();
      carouselRef.current.addEventListener('click', (event) => {
        updateToggle(false)
      })
  }, []);

  return (
    <div>
      {toggle &&
      <div className={styles.carouselContainer} ref={carouselRef}>
        <CollectionCarousel></CollectionCarousel>
      </div>}

      {!toggle
      
      }
    </div>
  )
}

export default Collection
