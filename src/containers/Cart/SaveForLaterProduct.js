import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Segment, Image, Button } from 'semantic-ui-react'
import { CartContext } from '../../contexts/CartContext'
import theme from '../../theme'
import StockTrack from '../../components/StockTrack'
import { connect } from "react-redux";
import { deleteSaveForLaterProduct } from '../../actions/saveForLaterActions'
import { AuthContext } from '../../contexts/AuthContext'
import { addCartProduct } from '../../actions/cartActions'

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

const SaveForLaterProduct = (props) => {
  const { product, history } = props
  const { dispatchCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)


  // Handle delete event
  const handleDelete = async () => {
    props.deleteSaveForLaterProduct(user, product.id)
  }


  // Handle Save For Later click event
  const handleAddToCart = async () => {
    props.deleteSaveForLaterProduct(user, product.id)
    props.addCartProduct(user, product)
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

        {product.productId &&
          <div className="small-stock">
            <StockTrack
              productId={product.productId}
              pid={product.pid} />
          </div>}

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


const mapDispatchToProps = (dispatch) => ({
  deleteSaveForLaterProduct: (user, id) => dispatch(deleteSaveForLaterProduct(user, id)),
  addCartProduct: (user, product) => dispatch(addCartProduct(user, product))
})

export default withRouter(connect(
  null, mapDispatchToProps
)(SaveForLaterProduct))
