import React from 'react'
import Web3 from 'web3'

const CollectibleCreator = () => {

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
        
        let create = await CollectibleFactoryContract.methods.getCollectiblesByOwner(account);
        let gas = await create.estimateGas();
        
        let transaction = create.send({
            from: account,
            gas: gas * 2
        });

        let e = CollectibleFactoryContract.events.GetCollectible().on('data', function(event){
            console.log("Returned: " + event.returnValues)
        })
        
    }

    const generateCollectible = (id, name, dna) => {
        console.log("Event recognised")
        let dnaStr = String(dna);
    }

    

    return (
        <div>
            <button onClick={getContract}></button>
        </div>
    )
}

export default CollectibleCreator