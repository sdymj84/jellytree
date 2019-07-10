import React, { useState, useRef, useEffect } from 'react'
import { Header, List, Button } from 'semantic-ui-react'
import AmazonStars from '../../../components/AmazonStars'
import styled from 'styled-components'
import theme from '../../../theme'
import ProductImages from './ProductImages'
import ProductSizes from './ProductSizes'
import ProductColors from './ProductColors'
import _ from 'lodash'

const isMobile = window.innerWidth < 600

const Container = styled.div`
  margin: 3em 10em;
  
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

const Product = () => {
  const [sizeNotSelected, setSizeNotSelected] = useState(false)
  const [executeScroll, scrollHtmlAttributes] = useScroll()

  const [selectedProductId, setSelectedProductId] = useState("")
  const handleAddToCart = () => {
    const product = _.find(variations, { 'color': selectedColor, 'size': selectedSize })
    const sku = product && product.sku
    if (sku) {
      setSelectedProductId(sku)
    } else {
      executeScroll()
      setSizeNotSelected(true)
    }
  }
  useEffect(() => {
    selectedProductId &&
      alert(`Product ${selectedProductId} is added to cart.`)
  }, [selectedProductId])


  const [selectedSize, setSelectedSize] = useState("")
  const handleSizeChange = (e, data) => {
    setSelectedSize(data.value)
    setSizeNotSelected(false)
  }

  const [selectedColor, setSelectedColor] = useState(colors[0].color)
  const handleColorChange = (i) => {
    setSelectedColor(colors[i].color)
  }
  useEffect(() => {
    const available = _.filter(variations, (product) => {
      return product.color === selectedColor
        && product.size === selectedSize
        && product.stock !== 0
    })
    available.length === 0 && setSelectedSize("")
    // eslint-disable-next-line
  }, [selectedColor])



  return (
    <Container>
      <ProductImages />

      <div className="product-details">
        <Header as="h1">
          Hat Summer Bonnet Breathable Double Gauze (Cotton) Toddler Sun Hat Infant Boys and Girls Beanie Cap, 3-18m
        </Header>
        <AmazonStars />
        <hr />
        <div className="options">
          Price : <Price>$10.99</Price>
        </div>

        <div className="options">
          <ProductSizes
            sizeNotSelected={sizeNotSelected}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
            scrollHtmlAttributes={scrollHtmlAttributes}
            variations={variations}
            selectedColor={selectedColor}
            sizes={sizes} />
        </div>

        <div className="options">
          <ProductColors
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            variations={variations}
            selectedSize={selectedSize}
            colors={colors} />
        </div>

        <div className="options">
          SKU : <span style={{ fontFamily: "Arial" }}>88012345678</span>
        </div>

        <StyledButton fluid
          size="big" color="orange"
          onClick={handleAddToCart}>
          Add to Cart
        </StyledButton>

        <List>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ STYLE ]</span> : Keep your little one stylish & protected with breathable cotton baby summer bonnet. HappyTree offers high quality, trustworthy materials crafted with special care for your babies. Simple but sophisticated designs & details, available in a variety of sizes with fresh colors for growing babies.
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ DESIGN ]</span> : This toddler summer hat with chin ties keep the hat on your baby’s head and foldable sun brim protects their sensitive skin. Mix and match our fun & lovely sun hats / bonnets / scarves to add a little bit of cuteness and complete your young ones adorable outfit :)
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ PERFECT GIFT ]</span> : Comfortable & easy-to-wear baby sun hat, great spring / summer /fall accessory for daily wear & outdoor activities: vacation trips, playgrounds, campfire nights, photoshoots, birthday gifts, etc. For any occasions, be more adorable and get more compliments!
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ MATERIAL & SIZE ]</span> : 100% cotton, breathable cotton lined. Fit ranges from S: 3 to 6 months / M: 6 to 12 months / L: 12 to 18 months. Please check detailed measurements before placing your order.
              </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="thumbs up outline" />
            <List.Content>
              <span>[ 100% SATISFACTION ]</span> : 30 Days 100% FREE returns and exchanges on any orders. If you are not satisfied with your experience with us, please contact us. It is our responsibility and policy to make sure that customers are 100% satisfied with our service.
              </List.Content>
          </List.Item>
        </List>
      </div>
    </Container>
  )
}




const variations = [
  {
    sku: '8801',
    color: 'White',
    size: 'S / 3-6 Months',
    stock: 0,
    images: [
      'https://picsum.photos/1000',
      'https://picsum.photos/900',
    ]
  },
  {
    sku: '8802',
    color: 'White',
    size: 'M / 6-12 Months',
    stock: 10,
    images: [
      'https://picsum.photos/1000',
      'https://picsum.photos/900',
    ]
  },
  {
    sku: '8803',
    color: 'Pink',
    size: 'S / 3-6 Months',
    stock: 10,
    images: [
      'https://picsum.photos/1000',
      'https://picsum.photos/900',
    ]
  },
  {
    sku: '8804',
    color: 'Pink',
    size: 'M / 6-12 Months',
    stock: 10,
    images: [
      'https://picsum.photos/1000',
      'https://picsum.photos/900',
    ]
  },
  {
    sku: '8805',
    color: 'Navy',
    size: 'S / 3-6 Months',
    stock: 10, images: [
      'https://picsum.photos/1000',
      'https://picsum.photos/900',
    ]
  },
  {
    sku: '8806',
    color: 'Navy',
    size: 'M / 6-12 Months',
    stock: 10,
    images: [
      'https://picsum.photos/1000',
      'https://picsum.photos/900',
    ]
  },
  {
    sku: '8807',
    color: 'Navy',
    size: 'L / 12-24 Months',
    stock: 10,
    images: [
      'https://picsum.photos/1000',
      'https://picsum.photos/900',
    ]
  },
]

const colors = _.uniqBy(variations, 'color')
const sizes = _.uniqBy(variations, 'size')



export default Product
