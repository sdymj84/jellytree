import React, { useState, useRef, useEffect, useContext } from 'react'
import { Header, List, Button } from 'semantic-ui-react'
import AmazonStars from '../../../components/AmazonStars'
import styled from 'styled-components'
import theme from '../../../theme'
import ProductImages from './ProductImages'
import ProductSizes from './ProductSizes'
import ProductColors from './ProductColors'
import _ from 'lodash'
import axios from 'axios'
import JellyLoader from '../../../components/JellyLoader'
import urls from '../../../urls'
import { CartContext } from '../../../contexts/CartContext'
import uuidv1 from 'uuid/v1'

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
    color: red;
    position: relative;
    bottom: 15px;
    font-size: 16px;
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


const Product = (props) => {
  const [executeScroll, scrollHtmlAttributes] = useScroll()
  const [productInfo, setProductInfo] = useState("")
  useEffect(() => {
    let isMounted = true
    async function getProduct() {
      try {
        const res = await axios.get(urls.getProductUrl + '?id=' + props.match.params.id)
        isMounted && setProductInfo(res.data)
      } catch (e) {
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



  // When changed color
  const frontProduct = _.maxBy(availableColors, 'soldCount')
  const [selectedColor, setSelectedColor] = useState(initialColor)
  const handleColorChange = (i) => {
    setSelectedColor(availableColors[i].color)
    setInitialState("")
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
  useEffect(() => {
    !initialState && setSelectedColor(frontProduct && frontProduct.color)
    // eslint-disable-next-line
  }, [frontProduct])




  // When changed size from dropdown
  const [selectedSize, setSelectedSize] = useState(initialSize)
  const [sizeNotSelected, setSizeNotSelected] = useState(false)
  const handleSizeChange = (e, data) => {
    console.log('size changed')
    setSelectedSize(data.value)
    setSizeNotSelected(false)
  }
  const handleSizeClose = () => {
    console.log('dropdown closed')
    if (sizeNotSelected) {
      setSelectedSize("")
    }
  }


  // When clicked Add to Cart
  const [selectedProductId, setSelectedProductId] = useState("")
  const handleAddToCart = () => {
    const product = _.find(productInfo.variations, { 'color': selectedColor, 'size': selectedSize })
    const pid = product && product.pid
    if (pid) {
      setSelectedProductId(pid)
    } else {
      executeScroll()
      setSizeNotSelected(true)
    }
  }
  const { dispatchCartProducts, dispatchCart } = useContext(CartContext)
  useEffect(() => {
    const addCartProduct = async () => {
      if (!selectedProductId) { return }
      try {
        dispatchCart({ type: 'OPEN_CART' })
        dispatchCartProducts({
          type: 'ADD_PRODUCT_LOADING',
          payload: { id: uuidv1(), loading: true }
        })
        const newCartProduct = await axios.post(urls.setCartProductUrl, {
          product: productInfo,
          pid: selectedProductId
        })
        dispatchCartProducts({
          type: 'ADD_PRODUCT_SUCCESS',
          payload: { newCartProduct: newCartProduct.data }
        })
      } catch (e) {
        console.log("Error while moving product to cart", e.response.data.message)
      }
    }
    addCartProduct()
  }, [productInfo, selectedProductId, dispatchCartProducts, dispatchCart])



  const [selectedOption, setSelectedOption] = useState("")
  useEffect(() => {
    const product = _.find(productInfo.variations, { 'color': selectedColor, 'size': selectedSize })
    setSelectedOption(product)
    // eslint-disable-next-line
  }, [selectedColor, selectedSize])


  // Render UI
  return (
    <JellyLoader
      isLoading={!productInfo || !selectedColor}>
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
              handleSizeClose={handleSizeClose}
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

          {selectedOption && selectedOption.stock <= 20 &&
            <div className="small-stock">
              Only {selectedOption.stock} left in stock - order soon.
            </div>}


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


export default Product
