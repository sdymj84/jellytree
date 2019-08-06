import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import _ from 'lodash'
// import axios from 'axios'

// axios.get('/__/firebase/init.js')
//   .then(async response => {
//     firebase.initializeApp(await response.json())
//   })

const firebaseConfig = {
  apiKey: "AIzaSyAJ1o7m1Oyd6VG0QO6jnHD1dXpfPigwT3I",
  authDomain: "jellytree-3cb33.firebaseapp.com",
  databaseURL: "https://jellytree-3cb33.firebaseio.com",
  projectId: "jellytree-3cb33",
  storageBucket: "jellytree-3cb33.appspot.com",
  messagingSenderId: "12612427352",
  appId: "1:12612427352:web:1e2b19cad82b60ab"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()


const Div = styled.div`
  color: red;
  position: relative;
  bottom: 15px;
  font-size: 16px;
`

const StockTrack = ({ productId, pid }) => {
  const [stock, setStock] = useState(0)
  useEffect(() => {
    const getStock = async () => {
      const docSnapshot = await db.collection('products').doc(productId).get()
      const product = docSnapshot.data()
      const variation = _.find(product.variations, { 'pid': pid })
      if (variation) {
        setStock(variation.stock)
      } else {
        setStock(0)
      }
    }
    getStock()
  }, [productId, pid])

  if (Number(stock) === 0 || Number(stock) > 20) {
    return null
  }

  console.log(stock)
  return (
    <Div>
      Only {stock} left in stock - order soon.
    </Div>
  )
}

export default StockTrack
