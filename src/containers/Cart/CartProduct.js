import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Segment, Image, Input, Button } from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import axios from 'axios';
import urls from '../../urls'
import theme from '../../theme'


const Product = styled(Segment)`
  display: flex;
  &&& {
    input {
      padding: 5px 2px 5px 7px;
      font-size: 14px;
    }
  }

  .img_link, .title_link {
    cursor: pointer;
  }
  .title_link:hover {
    color: ${theme.color};
  }
  .img_link {
    animation: scale-down 0.3s;
    transform: scale(1, 1);
    :hover {
      animation: scale-up 0.3s;
      transform: scale(1.1, 1.1);
    }
  }
  .small-stock {
    color: red;
    margin-top: 5px;
  }
`

const CartProduct = ({ product, history }) => {
  const { dispatchCartProducts } = useContext(CartContext)


  // Quantity change controls and update
  const [quantity, setQuantity] = useState(product.quantity)
  const [isQtyChanged, setIsQtyChanged] = useState(false)
  const [isQuantityError, setIsQuantityError] = useState(false)
  const handleQuantityChange = (e) => {
    e.persist()
    setQuantity(e.target.value)
  }
  useEffect(() => {
    setIsQtyChanged(Number(product.totalPrice) !== Number(product.price) * Number(quantity))
    if (!/^(0|[1-9]\d*)$/.test(quantity)) {
      setIsQuantityError(true)
      setIsQtyChanged(false)
    } else {
      setIsQuantityError(false)
    }
  }, [quantity, product, isQuantityError])


  const [isLoading, setIsLoading] = useState(false)
  const handleQtyUpdate = async () => {
    try {
      setIsLoading(true)
      await axios.put(urls.updateCartProductQty, {
        id: product.id,
        price: product.price,
        quantity: product.quantity
      })
      setIsLoading(false)
      dispatchCartProducts({
        type: 'UPDATE_QTY',
        payload: {
          id: product.id,
          quantity
        }
      })
    } catch (e) {
      setIsLoading(false)
      console.log("Error while updating quantity : ",
        e.response.data.message)
    }
  }


  // Handle delete event
  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await axios.put(urls.deleteCartProduct, {
        id: product.id
      })
      setIsLoading(false)
      dispatchCartProducts({
        type: 'REMOVE_PRODUCT_SUCCESS',
        payload: {
          id: product.id
        }
      })
    } catch (e) {
      setIsLoading(false)
      console.log("Error while deleting cart product : ",
        e.response.data.message)
    }
  }


  // Click product and redirect
  const handleProductClick = () => {
    history.push({
      pathname: `/product/${product.productId}`,
      state: { product }
    })
  }

  if (product.loading) {
    return (
      <Segment placeholder loading />
    )
  }

  return (
    <Product loading={isLoading}>
      <div style={{ flexBasis: '23%' }}>
        <Image
          className="img_link"
          style={{ marginRight: '1.5em' }}
          src={product.thumbnail}
          onClick={handleProductClick}
          size="tiny" />
      </div>
      <div style={{ flexBasis: '77%' }}>
        <div
          className="title_link"
          onClick={handleProductClick}
          style={{ fontSize: '1.3em' }}>{product.title}</div>
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
            value={quantity} />
          {isQtyChanged &&
            <Button
              style={{
                margin: '0 0 0 5px',
                padding: '7px'
              }}
              size="mini" color="green"
              onClick={handleQtyUpdate}>
              Update
           </Button>}
        </div>

        {product.stock <= 20 &&
          <div className="small-stock">
            Only {product.stock} left in stock - order soon.
          </div>}

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

export default withRouter(CartProduct)
