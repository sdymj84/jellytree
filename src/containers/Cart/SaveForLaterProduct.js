import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Segment, Image, Button } from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import axios from 'axios';
import urls from '../../urls'
import theme from '../../theme'
import StockTrack from '../../components/StockTrack'

const isMobile = window.innerWidth < 600

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
    margin-top: 5px;
  }
`

const SaveForLaterProduct = ({ product, history }) => {
  const {
    dispatchSaveForLaterProducts,
    dispatchCartProducts,
    dispatchCart
  } = useContext(CartContext)


  const [isLoading, setIsLoading] = useState(false)

  // Handle delete event
  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await axios.put(urls.deleteSaveForLaterProduct, {
        id: product.id
      })
      setIsLoading(false)
      dispatchSaveForLaterProducts({
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


  // Handle Save For Later click event
  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      const newCartProduct = await axios.put(urls.moveToCart, {
        product
      })
      setIsLoading(false)
      dispatchSaveForLaterProducts({
        type: 'REMOVE_PRODUCT_SUCCESS',
        payload: { id: product.id }
      })
      dispatchCartProducts({
        type: 'ADD_PRODUCT_SUCCESS',
        payload: { newCartProduct: newCartProduct.data }
      })
    } catch (e) {
      setIsLoading(false)
      console.log("Error while moving to Cart : ",
        e.response.data.message)
    }
  }


  // Click product and redirect
  const handleProductClick = () => {
    isMobile && dispatchCart({
      type: 'CLOSE_CART'
    })
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

        <div className="small-stock">
          <StockTrack
            productId={product.productId}
            pid={product.pid} />
        </div>

        <div style={{ marginTop: '5px' }}>
          <Button
            size="mini" color="green"
            onClick={handleAddToCart}>
            Add to Cart
            </Button>
          <Button
            size="mini" color="red"
            onClick={handleDelete}>
            Remove
            </Button>
        </div>
      </div>
    </Product>
  )
}

export default withRouter(SaveForLaterProduct)
