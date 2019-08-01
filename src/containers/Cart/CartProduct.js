import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Segment, Image, Input, Button } from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'

const Product = styled(Segment)`
  display: flex;
  &&& {
    input {
      padding: 5px 2px 5px 7px;
      font-size: 14px;
    }
  }
`

const CartProduct = ({ product }) => {
  const { dispatchCartProducts } = useContext(CartContext)
  const handleQuantityChange = (e) => {
    e.persist()
    dispatchCartProducts({
      type: 'CHANGE_QTY',
      payload: {
        id: product.id,
        quantity: e.target.value
      }
    })
  }
  const handleDelete = () => {
    // TODO: Delete from database
    dispatchCartProducts({
      type: 'REMOVE_PRODUCT',
      payload: {
        id: product.id
      }
    })
  }

  const [isQuantityError, setIsQuantityError] = useState(false)
  useEffect(() => {
    setIsQuantityError(!/^(0|[1-9]\d*)$/.test(product.quantity))
  }, [product.quantity])


  if (product.loading) {
    return (
      <Segment placeholder loading />
    )
  }

  return (
    <Product>
      <div style={{ flexBasis: '23%' }}>
        <Image
          style={{ marginRight: '1.5em' }}
          src={product.thumbnail}
          size="tiny" />
      </div>
      <div style={{ flexBasis: '77%' }}>
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
            style={{ width: '80px' }}
            onChange={handleQuantityChange}
            value={product.quantity} />
          {}
          <Button
            style={{
              margin: '0 0 0 5px',
              padding: '7px'
            }}
            size="mini" color="green">
            Update
           </Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '5px',
          }}>
          <div>Total : ${product.totalPrice}</div>
          <div>
            <Button
              size="mini" color="yellow">
              Save for Later
            </Button>
            <Button
              size="mini" color="red"
              onClick={handleDelete}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Product>
  )
}

export default CartProduct
