import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Segment, Image, Input, Button } from 'semantic-ui-react'

const Product = styled(Segment)`
  display: flex;
  img {
    margin-right: 1.5em;
  }
  &&& {
    input {
      padding: 5px 2px 5px 7px;
      font-size: 14px;
    }
  }
`

const CartProduct = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const handleQuantityChange = (e) => {
    e.persist()
    setQuantity(e.target.value)
  }

  const [isQuantityError, setIsQuantityError] = useState(false)
  useEffect(() => {
    setIsQuantityError(!/^(0|[1-9]\d*)$/.test(quantity))
  }, [quantity])

  return (
    <Product>
      <div>
        <Image
          src={product.thumbnail}
          size="tiny" />
      </div>
      <div>
        <div style={{ fontSize: '1.3em' }}>{product.title}</div>
        <div>Color : {product.color}</div>
        <div>Size : {product.size}</div>
        <div>Price : ${product.price}</div>
        <div>Qty : {' '}
          <Input
            type="number"
            min={1}
            size="mini"
            error={isQuantityError}
            style={{ width: '100px' }}
            onChange={handleQuantityChange}
            value={quantity} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '5px',
          }}>
          <div>Total Price : ${product.totalPrice}</div>
          <div>
            <Button
              size="mini">
              Later
            </Button>

          </div>
        </div>
      </div>
    </Product>
  )
}

export default CartProduct
