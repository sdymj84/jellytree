import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { DbContext } from '../contexts/DbContext'


const Div = styled.div`
  color: red;
  font-size: 16px;
`

const StockTrack = ({ productId, pid }) => {
  const { db } = useContext(DbContext)
  const [stock, setStock] = useState(0)
  useEffect(() => {
    const getStock = async () => {
      try {
        await db.collection('products').doc(productId)
          .onSnapshot(doc => {
            const product = doc.data()
            const variation = _.find(product.variations, { 'pid': pid })
            if (variation) {
              setStock(variation.stock)
            } else {
              setStock(0)
            }
          })
      } catch (e) {
        console.log(e)
      }
    }
    db && getStock()
  }, [db, productId, pid])

  if (Number(stock) === 0 || Number(stock) > 20) {
    return null
  }

  return (
    <Div>
      Only {stock} left in stock - order soon.
    </Div>
  )
}

export default StockTrack
