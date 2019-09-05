import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Segment, Image, Input, Button } from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext'
import theme from '../../theme'
import StockTrack from '../../components/StockTrack'
import ConfirmModal from '../../components/ConfirmModal'
import { connect } from "react-redux";
import { deleteCartProduct, updateCartProductQty } from '../../actions/cartActions';
import { addSaveForLaterProduct } from '../../actions/saveForLaterActions';

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

const CartProduct = (props) => {
  const { product, history, location } = props
  const { user } = useContext(AuthContext)
  const { dispatchCart } = useContext(CartContext)


  // Quantity change controls and update
  const [quantity, setQuantity] = useState(product.quantity || 1)
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



  // Handle update qty event
  const handleQtyUpdate = () => {
    props.updateCartProductQty(user, product.id, quantity, product.price)
  }

  // Handle delete event
  const handleDelete = () => {
    props.deleteCartProduct(user, product.id)
  }

  const [modalShow, setModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const handleModalClose = (yesOrNo) => {
    setModalShow(false)
    yesOrNo === 'no' && dispatchCart({ type: 'OPEN_CART' })
  }
  // Handle Save For Later click event
  const handleSaveForLater = () => {
    if (!user) {
      setModalShow(true)
      setModalMessage("Need login to save for later, would you like to sign in now?")
      return
    }

    props.addSaveForLaterProduct(product)
    props.deleteCartProduct(user, product.id)
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


  return (
    <Product loading={product.isLoading}>
      <div style={{ flexBasis: '23%', marginRight: '8px' }}>
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

        {product.productId &&
          <div className="small-stock">
            <StockTrack
              productId={product.productId}
              pid={product.pid} />
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
              size="mini" color="yellow"
              onClick={handleSaveForLater}>
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
      <ConfirmModal
        modalShow={modalShow}
        modalMessage={modalMessage}
        handleNoClick={handleModalClose}
        iconName='sign in'
        yesButton="Yes, Sign In"
        noButton="No, Stay Anonymous"
        handleYesClick={() => {
          history.push(`/signin?redirectUrl=${location.pathname}`)
          handleModalClose()
        }} />
    </Product>
  )
}



const mapDispatchToProps = (dispatch) => {
  return {
    deleteCartProduct: (user, id) => dispatch(deleteCartProduct(user, id)),
    updateCartProductQty: (user, id, quantity, price) =>
      dispatch(updateCartProductQty(user, id, quantity, price)),
    addSaveForLaterProduct: (product) =>
      dispatch(addSaveForLaterProduct(product)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(CartProduct))
