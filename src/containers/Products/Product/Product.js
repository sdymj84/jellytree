import React, { useState, useRef, useEffect } from 'react'
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
    async function getProduct() {
      try {
        const res = await axios.get(`https://us-central1-jellytree-3cb33.cloudfunctions.net/getProduct?id=${props.match.params.id}`)
        // const res = await axios.get(`http://localhost:5001/jellytree-3cb33/us-central1/getProduct?id=${props.match.params.id}`)
        console.log(res.data)
        setProductInfo(res.data)
      } catch (e) {
        console.log("Error getting a document", e)
      }
    }
    getProduct()
  }, [props.match.params.id])

  const availableOptions = _.filter(productInfo.variations, v => v.stock > 0)
  const availableColors = _.uniqBy(availableOptions, 'color')
  const sizes = _.uniqBy(productInfo.variations, 'size')



  // When changed color
  const frontProduct = _.maxBy(availableColors, 'soldCount')
  const [selectedColor, setSelectedColor] = useState("")
  const handleColorChange = (i) => {
    setSelectedColor(availableColors[i].color)
  }
  useEffect(() => {
    const available = _.filter(productInfo.variations, (product) => {
      return product.color === selectedColor
        && product.size === selectedSize
        && product.stock !== 0
    })
    available.length === 0 && setSelectedSize("")
    // eslint-disable-next-line
  }, [selectedColor])
  useEffect(() => {
    setSelectedColor(frontProduct && frontProduct.color)
  }, [frontProduct])




  // When changed size from dropdown
  const [selectedSize, setSelectedSize] = useState("")
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
  useEffect(() => {
    selectedProductId &&
      alert(`Product ${selectedProductId} is added to cart.`)
  }, [selectedProductId])


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
            {productInfo.title}
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
