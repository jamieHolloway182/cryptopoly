import Web3 from 'web3';
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

    const connectRef = useRef();
    const [accounts, setAccounts] = useState([])
    const [disbaled, setDisabled] = useState(false)

    useEffect(() => {
      if(!disbaled){
        handleDisablingConnect();
      }
    })

    useEffect(() => {
      connectRef.current.addEventListener('click', () => {
        //Will Start the metamask extension
        ethereum.request({ method: 'eth_requestAccounts' });
        handleDisablingConnect();
      });
    }, [])

    const handleDisablingConnect = async () => {
      await window.ethereum.sendAsync({data:'eth_requestAccounts'})
      window.web3 = new Web3(window.ethereum);
      //get account
      const accounts = await web3.eth.getAccounts().then(checkAccountsLength());
      setAccounts(accounts)
    }

    const checkAccountsLength = () => {  
      if (accounts.length > 0){
        setDisabled(true)
        connectRef.current.disbaled = true;
      }
    }
  
  return (
    <div>
      <div className={styles.description}>BOARD GAMES LIKE YOU'VE NEVER SEEN BEFORE </div>
      {!disbaled && <button className={styles.button} ref={connectRef}>Connect to MetaMask</button>}
      {disbaled && <div className={styles.description}>METAMASK CONNECTED!</div>}
    </div>
  )
}
