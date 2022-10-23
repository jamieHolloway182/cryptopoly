import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import {nanoid} from "nanoid";
import Room from "../components/Room"
import CanvasContainer from '../components/Game/CanvasContainer';

export default function Home() {

    const connectRef = useRef();

    useEffect(() => {
      connectRef.current.addEventListener('click', () => {
        //Will Start the metamask extension
        ethereum.request({ method: 'eth_requestAccounts' });
      });
    })
  
  return (
    <div>
      <button ref={connectRef}>Connect to MetaMask</button>
    </div>
  )
}
