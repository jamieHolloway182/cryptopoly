import React, {useRef, useState} from 'react'
import Web3 from 'web3'
import style from '../../styles/Home.module.css'
import Image from 'next/image'

const CollectibleCreator = () => {

    const nameRef = useRef()
    const buttonRef = useRef()
    const [imageGenerated, updateImage] = useState(false)

    const getContract = async () => {
        //connect with web3
        await window.ethereum.sendAsync({data:'eth_requestAccounts'})
        window.web3 = new Web3(window.ethereum);
        //get account
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        var abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"collectibles","type":"uint256[]"}],"name":"GetCollectible","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"collectibleId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"dna","type":"uint256"}],"name":"NewCollectible","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"collectibleToOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"collectibles","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"dna","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"createRandomCollectible","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"getCollectiblesByOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
        var contractAddress = "0xc6B48EE98cea7E33DdEC113AE546cc68cB53Ca0F"
        let CollectibleFactoryContract = await new web3.eth.Contract(abi, contractAddress);
        
        let create = await CollectibleFactoryContract.methods.createRandomCollectible(nameRef.current.value);
        let gas = await create.estimateGas();
        
        let transaction = create.send({
            from: account,
            gas: gas * 2
        });

        let e = CollectibleFactoryContract.events.GetCollectible().on('data', function(event){
            console.log("Returned: " + event.returnValues)
        })
    }

    const generateImage = () => {
        updateImage(true);
        buttonRef.current.disabled = true;
    }

    const generateCollectible = (id, name, dna) => {
        console.log("Event recognised")
        let dnaStr = String(dna);
    }

    

    return (
        <div className={style.collectibleContainer}>
            <textarea placeholder={"Type in your name..."} className={style.textArea} ref={nameRef}></textarea>
            <button onClick={generateImage} className={style.button} ref={buttonRef}>Generate Unique Collectable</button>
            <span className={style.title}>You've won a... </span>
            {imageGenerated && <Image src='/../public/ludo.jpg' width={"100%"} height={"250%"}></Image>}
        </div>
    )
}

export default CollectibleCreator