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
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
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
