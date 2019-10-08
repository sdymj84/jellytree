import React, { useState, useRef, useEffect, useContext } from 'react'
import { Header, List, Button } from 'semantic-ui-react'
import AmazonStars from '../../../components/AmazonStars'
import styled from 'styled-components'
import theme from '../../../theme'
import ProductImages from './ProductImages'
import ProductSizes from './ProductSizes'
import ProductColors from './ProductColors'
import StockTrack from '../../../components/StockTrack';
import _ from 'lodash'
import axios from 'axios'
import JellyLoader from '../../../components/JellyLoader'
import urls from '../../../urls'
import { CartContext } from '../../../contexts/CartContext'
import uuidv1 from 'uuid/v1'
import { AuthContext } from '../../../contexts/AuthContext'
import { addCartProduct } from '../../../actions/cartActions';
import { connect } from "react-redux";

const isMobile = window.innerWidth < 600

const Container = styled.div`
  margin: 3em 10em;
  min-height: 600px;
  
  @media (max-width: 1300px) {
    margin: ${isMobile ? '0' : '3em 4em'};
  }

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > div {
    margin: 1em;
  }
  .thumbnails {
    flex: 0 0 50px;
    img {
      margin-bottom: 1em;
    }
  }
  .main-image {
    flex: 1 1 400px;
  }
  .product-details {
    flex: 4 1 400px;
    margin-top: ${isMobile ? '3em' : '1em'};
    .list span {
      color: ${theme.color};
    }
  }
  .options {
    margin-bottom: 2em;
    .size-color-name {
      font-family: "Exo 2";
    }
  }
  .small-stock {
    position: relative;
    bottom: 15px;
  }
`
const Price = styled.span`
  &&& {
    font-size: 2em;
    font-family: "Exo 2";
    color: tomato;
  }
`
const StyledButton = styled(Button)`
  &&& {
    box-shadow: 0 0 15px -4px grey;
    margin-bottom: 3em;
    max-width: 500px;
  }
`

const useScroll = () => {
  const ref = useRef(null)
  const executeScroll = () => {
    window.scrollTo(0, ref.current.offsetTop - (window.innerHeight / 2) + 50)
  }
  const htmlElementAttributes = { ref }

  return [executeScroll, htmlElementAttributes]
}


//=========================================================================
//=========================================================================


// Create cart from product
const createCartProduct = (user, product, pid) => {
  const variation = _.find(product.variations, { 'pid': pid })
  return {
    id: uuidv1(),
    uid: user ? user.uid : "",
    productId: product.id,
    pid: pid,
    sku: variation.sku,
    title: variation.title,
    color: variation.color,
    size: variation.size,
    price: variation.price,
    thumbnail: variation.thumbnail,
    quantity: 1,
    totalPrice: variation.price,
  }
}


const Product = (props) => {
  const { user } = useContext(AuthContext)
  const [executeScroll, scrollHtmlAttributes] = useScroll()
  const [productInfo, setProductInfo] = useState("")
  useEffect(() => {
    let isMounted = true
    async function getProduct() {
      try {
        const res = await axios.get(urls.getProduct + '?id=' + props.match.params.id)
        isMounted && setProductInfo(res.data)
      } catch (e) {
        console.log(e)
        console.log("Error getting a document", e.response.data.message)
      }
    }
    getProduct()
    return () => {
      isMounted = false
    }
  }, [props.match.params.id])

  const availableOptions = _.filter(productInfo.variations, v => Number(v.stock) > 0)
  const availableColors = _.uniqBy(availableOptions, 'color')
  const sizes = _.uniqBy(productInfo.variations, 'size')

  const [initialState, setInitialState] = useState(props.location.state)
  const [initialColor, setInitialColor] = useState(initialState ? initialState.product.color : "")
  const [initialSize, setInitialSize] = useState(initialState ? initialState.product.size : "")


  useEffect(() => {
    const state = props.location.state
    setInitialState(state)
    if (state) {
      setInitialColor(state.product.color)
      setInitialSize(state.product.size)
    }
  }, [props.location.state])



  // When changed size from dropdown
  const [selectedSize, setSelectedSize] = useState(initialSize)
  const [sizeNotSelected, setSizeNotSelected] = useState(false)
  const handleSizeChange = (e, data) => {
    setSelectedSize(data.value)
    setSizeNotSelected(false)
    handleSelectOption(null, data.value || null)
  }



  // When changed color
  const frontProduct = _.maxBy(availableColors, 'soldCount')
  const [selectedColor, setSelectedColor] = useState(initialColor)
  const handleColorChange = (i) => {
    setSelectedColor(availableColors[i].color)
    setInitialState("")
    handleSelectOption(availableColors[i].color, null)
  }
  useEffect(() => {
    // redirected from cart > get initial color/size and apply
    if (initialState) {
      const available = productInfo && _.filter(productInfo.variations, (product) => {
        return product.color === initialColor
          && product.size === initialSize
          && Number(product.stock) !== 0
      })
      setSelectedSize(available.length ? initialSize : "")
      setSelectedColor(available.length ? initialColor : frontProduct && frontProduct.color)
      handleSelectOption(initialColor, initialSize)

      // entered from products > set best selling color and no size
    } else {
      const available = productInfo && _.filter(productInfo.variations, (product) => {
        return product.color === selectedColor
          && product.size === selectedSize
          && Number(product.stock) !== 0
      })
      available.length === 0 && setSelectedSize("")
    }
    // eslint-disable-next-line
  }, [productInfo, selectedColor, initialState])

  // set best selling color on first launch only
  useEffect(() => {
    !initialState && setSelectedColor(frontProduct && frontProduct.color)
    // eslint-disable-next-line
  }, [frontProduct])




  // selectedOption function that's triggered when color/size changes
  const [selectedOption, setSelectedOption] = useState("")
  const handleSelectOption = (color = null, size = null) => {
    const product = _.find(productInfo.variations, { 'color': color || selectedColor, 'size': size || selectedSize })
    setSelectedOption(size === null ? "" : product)
  }



  // When clicked Add to Cart
  const { dispatchCart } = useContext(CartContext)
  const handleAddToCart = () => {
    const product = _.find(productInfo.variations, { 'color': selectedColor, 'size': selectedSize })
    const pid = product && product.pid
    if (pid) {
      dispatchCart({ type: 'OPEN_CART' })
      const newCartProduct = createCartProduct(user, productInfo, pid)
      props.addCartProduct(user, newCartProduct)

    } else {
      executeScroll()
      setSizeNotSelected(true)
    }
  }


  // Render UI
  return (
    <JellyLoader
      isLoading={!productInfo || !selectedColor || selectedOption === undefined}>
      <Container>
        <ProductImages
          availableColors={availableColors}
          selectedColor={selectedColor} />

        <div className="product-details">
          <Header as="h1">
            {selectedOption ? selectedOption.title : productInfo.title}
          </Header>
          <AmazonStars />
          <hr />
          <div className="options">
            Price : <Price>${selectedOption ? selectedOption.price : " ??"}</Price>
          </div>

          <div className="options">
            <ProductSizes
              sizeNotSelected={sizeNotSelected}
              selectedSize={selectedSize}
              handleSizeChange={handleSizeChange}
              scrollHtmlAttributes={scrollHtmlAttributes}
              productInfo={productInfo}
              selectedColor={selectedColor}
              sizes={sizes} />
          </div>

          <div className="options">
            <ProductColors
              availableColors={availableColors}
              selectedColor={selectedColor}
              handleColorChange={handleColorChange}
              productInfo={productInfo}
              selectedSize={selectedSize} />
          </div>

          <div className="options">
            Product ID : <span style={{ fontFamily: "Arial" }}>
              {selectedOption && selectedOption.pid}
            </span>
          </div>

          <div className="small-stock">
            <StockTrack
              productId={productInfo.id}
              pid={selectedOption && selectedOption.pid} />
          </div>

          <StyledButton fluid
            size="big" color="orange"
            onClick={handleAddToCart}>
            Add to Cart
          </StyledButton>
          <List>
            {selectedOption
              ? selectedOption.bulletPoints.map((item, i) =>
                <List.Item key={i}>
                  <List.Icon name="thumbs up outline" />
                  <List.Content>
                    <span>{item.split(':')[0]}</span> : {item.split(':').splice(1)}
                  </List.Content>
                </List.Item>
              )
              : productInfo && productInfo.bulletPoints.map((item, i) =>
                <List.Item key={i}>
                  <List.Icon name="thumbs up outline" />
                  <List.Content>
                    <span>{item.split(':')[0]}</span> : {item.split(':').splice(1)}
                  </List.Content>
                </List.Item>)}
          </List>
        </div>
      </Container>
    </JellyLoader>
  )
}


const mapDispatchToProps = (dispatch) => {
  return {
    addCartProduct: (user, newCartProduct) =>
      dispatch(addCartProduct(user, newCartProduct))
  }
}


export default connect(null, mapDispatchToProps)(Product)
